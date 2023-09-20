import { AppwriteException } from "@refinedev/appwrite";
import { AuthBindings } from "@refinedev/core";
import * as cookie from "cookie";
import Cookies from "js-cookie";

import { account, appwriteClient, TOKEN_KEY } from "./utility";
let COOKIE_DOMAIN = "core.smartauctionhouse.com";
if (process.env.NODE_ENV === "development") {
  COOKIE_DOMAIN = "localhost";
}

const cookies = Cookies.withAttributes({ domain: COOKIE_DOMAIN, sameSite: "strict" });

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);

      const { jwt } = await account.createJWT();

      if (jwt) {
        cookies.set(TOKEN_KEY, jwt);
      }

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      const { type, message, code } = error as AppwriteException;
      return {
        success: false,
        error: {
          message,
          name: `${code} - ${type}`,
        },
      };
    }
  },
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (error: any) {
      cookies.remove(TOKEN_KEY);
      appwriteClient.setJWT("");

      return {
        success: true,
        redirectTo: "/login",
      };
    }
    cookies.remove(TOKEN_KEY);
    appwriteClient.setJWT("");

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async (request) => {
    // for server side authentication
    let token = undefined;
    const hasCookie = request.headers.get("Cookie");
    if (hasCookie) {
      const parsedCookie = cookie.parse(request.headers.get("Cookie"));
      token = parsedCookie[TOKEN_KEY];
    } else {
      const parsedCookie = cookies.get(TOKEN_KEY);
      token = parsedCookie ? JSON.parse(parsedCookie) : undefined;
    }

    if (token) {
      appwriteClient.setJWT(token);
    }

    const { pathname } = new URL(request.url);
    const query = pathname === "/" ? "" : `?to=${encodeURIComponent(pathname)}`;

    try {
      const session = await account.get();

      if (session) {
        return {
          authenticated: true,
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
        redirectTo: `/login${query}`,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Unauthenticated",
      },
      logout: true,
      redirectTo: `/login${query}`,
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = await account.get();

    if (user) {
      return user;
    }

    return null;
  },
};

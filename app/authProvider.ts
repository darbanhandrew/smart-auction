import { AppwriteException } from "@refinedev/appwrite";
import { AuthBindings } from "@refinedev/core";
import * as cookie from "cookie";
import Cookies from "js-cookie";
import * as setCookie from "set-cookie-parser";
import { account, appwriteClient, TOKEN_KEY,AppwriteHostname,SsrHostname,APPWRITE_PROJECT, APPWRITE_URL } from "./utility";
const sessionNames = [
  "a_session_" + APPWRITE_PROJECT.toLowerCase(),
  "a_session_" + APPWRITE_PROJECT.toLowerCase() + "_legacy",
];
export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);

      const ssrHostname =
      SsrHostname === "localhost" ? SsrHostname : "." + SsrHostname;
    const appwriteHostname =
      AppwriteHostname === "localhost"
        ? AppwriteHostname
        : "." + AppwriteHostname;
      const sessionCookie = Cookies.get(sessionNames[0])
      const sessionCookieLegacy= Cookies.get(sessionNames[1])
      const sesssionCookiesStr = (sessionCookie ?? "")
      .split(appwriteHostname)
      .join(ssrHostname);
      const sessionCookieLegacyStr = (sessionCookieLegacy??"").split(appwriteHostname)
      .join(ssrHostname);

      const { jwt } = await account.createJWT();

      if (jwt) {
        Cookies.set(TOKEN_KEY, jwt);
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
      Cookies.remove(TOKEN_KEY);
      appwriteClient.setJWT("");
      return {
        success: false,
        error,
        redirectTo: "/login",
      };
    }
    Cookies.remove(TOKEN_KEY);
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
    // let token = undefined;
    // const hasCookie = request.headers.get("Cookie");
    // if (hasCookie) {
    //   const parsedCookie = cookie.parse(request.headers.get("Cookie"));
    //   token = parsedCookie[TOKEN_KEY];
      
    // } else {
    //   const parsedCookie = Cookies.get(TOKEN_KEY);
    //   token = parsedCookie ? JSON.parse(parsedCookie) : undefined;
    // }

    // if (token) {
    //   appwriteClient.setJWT(token);
    // }

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
      //refresh token if expire
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

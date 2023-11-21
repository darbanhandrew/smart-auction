import { AppwriteException } from "@refinedev/appwrite";
import { AuthBindings } from "@refinedev/core";
import * as cookie from "cookie";
import Cookies from "js-cookie";
import * as setCookie from "set-cookie-parser";
import { account, appwriteClient, TOKEN_KEY,AppwriteHostname,SsrHostname,APPWRITE_PROJECT, APPWRITE_URL } from "./utility";
// import { createCookieSee/ssionStorage } from "@remix-run/node"; // or cloudflare/deno

const sessionNames = [
  "a_session_" + APPWRITE_PROJECT.toLowerCase(),
  "a_session_" + APPWRITE_PROJECT.toLowerCase() + "_legacy",
];
// const storage =
//   createCookieSessionStorage(
//     {
//       // a Cookie from `createCookie` or the CookieOptions to create one
//       cookie: {
//         name: sessionNames[0],

//         // all of these are optional
//         // Expires can also be set (although maxAge overrides it when used in combination).
//         // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
//         //
//         // expires: new Date(Date.now() + 60_000),
//         httpOnly: true,
//         maxAge: 60*60*24*365,
//         path: "/",
//         sameSite: "lax",
//         secrets: ["s3cret1"],
//         secure: true
//       },
//     }
//   );

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);
      Cookies.set("authenticated","true");
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
      Cookies.set("authenticated","false");
    } catch (error: any) {
      // const session = await storage.getSession(request.headers.get("Cookie"))
      return {
        success: false,
        error,
        redirectTo: "/login",
        headers:{
          // "Set-Cookie":await storage.destroySession(session),
        }
      };
    }

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
    const COOKIE_NAME= "authenticated";
    const parsedCookie = Cookies.get(sessionNames[0]);
    token = parsedCookie ? JSON.parse(parsedCookie) : undefined;
    let authenticated = undefined
    if (request) {
      // for SSR
      try{
        const parsedCookie = cookie.parse(request.headers.get("Cookie"));
        authenticated = parsedCookie[COOKIE_NAME];
      }
      catch {
        authenticated="false";
      }

    } else {
      // for CSR
      const authenticated = Cookies.get(COOKIE_NAME);
    }
    const isAuthenticated = authenticated == "true"? true:false;
  //   if(isAuthenticated){
  //   try {
  //     const session = await account.get();
  //     console.log(session)
  //     if (session) {
  //       console.log("I am here")
  //       return {
  //         authenticated: true,
  //         redirectTo:`/`
  //       };
  //     }
  //   } catch (error: any) {
  //     //refresh token if expire
  //     // await account.deleteSession("current");
  //     console.log("i am here")
  //     return {
  //       authenticated: false,
  //     };
  //   }
  // }
  //   console.log("i am here2")
    // await account.deleteSession("current");
    return {
      authenticated: isAuthenticated,
      redirectTo:isAuthenticated?'/':'/login'
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = 1

    if (user) {
      return user;
    }

    return null;
  },
};

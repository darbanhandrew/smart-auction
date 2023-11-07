import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authProvider } from "~/authProvider";

import { AppIcon } from "@components/app-icon";
import { Header } from "@components/header";
import { account, functions } from "~/utility";
import { use } from "i18next";
export default function BaseLayout() {
  //render menu using meta data label as title and name as resource name
  // useEffect(() => {
  //   const getUserMemberships = async () => {
  //     const user = await account.get();

  //     if (user) {
  //       const result = await functions.createExecution("userFunctions", JSON.stringify({
  //         type: "listMemberships",
  //         body: {
  //           user_id: user.$id
  //         }
  //       }));

  //       const responseObj = JSON.parse(result.response);
  //       let isAdmin = false;

  //       responseObj.memberships.forEach((membership: any) => {
  //         if (membership.roles.includes("admin")) {
  //           isAdmin = true;
  //         }
  //       });
  //       if (!isAdmin) {
  //         window.location.href = "https://desk.smartauctionhouse.com";
  //       }
  //     }
  //   };

  //   getUserMemberships();
  // }, []);
  return (

    <>
      <ThemedLayoutV2
        Header={Header}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="میز کار اسمارت آکشن"
            icon={<AppIcon />}
          />
        )}
      >
        <Outlet />
      </ThemedLayoutV2>
    </>
  );
}

/**
 * We're checking if the current session is authenticated.
 * If not, we're redirecting the user to the login page.
 * This is applied for all routes that are nested under this layout (_protected).
 */

export async function loader({ request }: LoaderArgs) {
  const { authenticated, redirectTo } = await authProvider.check(request);
  //check if authProvider.getIdentity() is not returning null and create a user object from it

  if (!authenticated) {

    throw redirect(redirectTo ?? "/login");
  }
  return {};
}

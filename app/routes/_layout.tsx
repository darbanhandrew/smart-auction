import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Outlet } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authProvider } from "~/authProvider";

import { AppIcon } from "@components/app-icon";
import { Header } from "@components/header";
import { functions } from "~/utility";
import { useGetIdentity } from "@refinedev/core";
export default function BaseLayout() {
  //render menu using meta data label as title and name as resource name
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="Smart Auction Dashboard"
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

type IUser = {
  id: number;
  name: string;
  avatar: string;
};
export async function loader({ request }: LoaderArgs) {
  const { authenticated, redirectTo } = await authProvider.check(request);
  const { data: user } = useGetIdentity<IUser>();


  const result = await functions.createExecution("userFunctions", JSON.stringify({
    type: "listMemberships",
    body: {
        //generate
        userId: user ? user.id : null
    }
}));
/*result is like this: 
{"total":1,"memberships":[{"$id":"64bc5aac02ba4666f28e","$createdAt":"2023-07-22T22:39:40.011+00:00","$updatedAt":"2023-07-22T22:39:40.011+00:00","userId":"64ae415f66d0c9fda80b","userName":"محمد دربان باران","userEmail":"+989981662304@sah.com","teamId":"64bc5a64bfd9bd75c9bc","teamName":"admin","invited":"2023-07-22T22:39:40.011+00:00","joined":"2023-07-22T22:39:40.011+00:00","confirm":true,"roles":["admin"]}]}*/
//get the role of the user from all memberships and if any of them is not admin redirect user to https://desk.smartauctionhouse.com
let isAdmin = false;
const responseObj = JSON.parse(result.response);
responseObj.memberships.forEach((membership: any) => {
  if (membership.roles.includes("admin")) {
    isAdmin = true;
  } 
}
);
if (!isAdmin) {
  throw redirect("https://desk.smartauctionhouse.com");
}

  if (!authenticated) {
    throw redirect(redirectTo ?? "/login");
  }

  return {};
}

import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UserProfileEditComp } from "~/components/user_profile/UserProfileEditComp";
import { functions } from "~/utility";
import { User } from "~/utility/UserType";

export const loader: LoaderFunction = async ({ params, request }) => {
    const result = await functions.createExecution("userFunctions", JSON.stringify({ type: "list" }), false);
    return json(result.response);
}

export default function UserProfileEdit() {
    const initialUsers = useLoaderData<typeof loader>();
    return <UserProfileEditComp data={initialUsers} />;
}
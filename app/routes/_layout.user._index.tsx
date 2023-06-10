import UserListComp from "~/components/user/UserListComp";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import { functions } from "~/utility";
import { json, LoaderFunction } from "@remix-run/node";
export const loader: LoaderFunction = async ({ params, request }) => {
    const result = await functions.createExecution("userFunctions", JSON.stringify({ type: "list" }), false);
    return json(result.response);
}

export default function UserList() {
    const initialUsers = useLoaderData<typeof loader>();
    return <UserListComp data={initialUsers} />;
}
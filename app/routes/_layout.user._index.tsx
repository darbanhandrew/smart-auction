import UserListComp from "~/components/user/UserListComp";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import { functions } from "~/utility";
import { json, LoaderFunction } from "@remix-run/node";
import { Client, Users, Query } from "node-appwrite";

let client = new Client();
const APPWRITE_URL = "https://console.smartauctionhouse.com/v1";
const APPWRITE_PROJECT = "smart_auction";
const TOKEN_KEY = "adm-appwrite-jwt";
const APPWRITE_API_KEY = "f6b7f09a8d67b0a1cfb64af40e42c08a8b31e2d4a8f3d6e406be6f688b59027842bfae61d550423c405a9799a3fb636042e39e1d6601e308d137c11905a638552a12214c38b2a1421905eabb9b7b032e1effa54f9d6832ea2374fda97d3946f42750d9e3e02c0fe01e315c49b03e0658aabf6a20a3fd19b7acffa6926f980a84"

client
    .setEndpoint(APPWRITE_URL) // Your API Endpoint
    .setProject(APPWRITE_PROJECT) // Your project ID
    .setKey(APPWRITE_API_KEY) // Your secret API key
    .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;
let users = new Users(client);
export const loader: LoaderFunction = async ({ params, request }) => {
    const result = await users.list(
    [
        Query.orderDesc('$createdAt')
    ]);
    return json(result.users);
}

export default function UserList() {
    const initialUsers = useLoaderData<typeof loader>();
    return <UserListComp data={initialUsers} />;
}
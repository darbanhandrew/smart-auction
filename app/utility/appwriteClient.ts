import { Account, Appwrite, Storage, Functions } from "@refinedev/appwrite";

const APPWRITE_URL = "https://core.smartauctionhouse.com/v1";
const APPWRITE_PROJECT = "smart_auction";
const TOKEN_KEY = "8ae135e4808596f552830a2868930bb57dc573698ec03d3840334ba82b3e72a997f2f77eb4f8fe3a12195c442abb16465967bbef1fb188ed8f72a43241747a9f70e47c9ea9e213449f8da67f679cf89167b1a07ff41ac882363a253fa834819c4ac11bbbbe52123f407abcc3673708b9c9d5b640c2ea9d7b3b4246aeac9cc5ac";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const functions = new Functions(appwriteClient);
export { appwriteClient, account, storage, functions, TOKEN_KEY };

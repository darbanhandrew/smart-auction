import { Account, Appwrite, Storage, Functions } from "@refinedev/appwrite";

const APPWRITE_URL = "https://core.smartauctionhouse.com/v1";
const APPWRITE_PROJECT = "smart_auction";
const TOKEN_KEY = "adm-appwrite-jwt";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const functions = new Functions(appwriteClient);
export { appwriteClient, account, storage, functions, TOKEN_KEY };

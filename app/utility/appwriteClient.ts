import { Account, Appwrite, Storage, Functions } from "@refinedev/appwrite";

const APPWRITE_URL = "https://core.smartauctionhosue.com/v1";
const APPWRITE_PROJECT = "smart_auction";
const TOKEN_KEY = "f9463e0a66c8b11b085858c78d6c37416f38866732fd78930b35a78e7a56e72d89771f8683d24d6e35a2f0d9192ebd952368e53cf0eec46df852f1fb32006a695f65b46b05cdd4ceaebf2eb5ab3dedf99ce75ca3a83fd05a6697814ede9e40951c8e8c33981f3375c32bfae87d31f5186c73ae18e4e687ab4e561172ac9c9e91";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const functions = new Functions(appwriteClient);
export { appwriteClient, account, storage, functions, TOKEN_KEY };

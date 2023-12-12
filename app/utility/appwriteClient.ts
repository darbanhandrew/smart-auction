import { Account, Appwrite, Storage, Functions,Databases } from "@refinedev/appwrite";

const APPWRITE_URL = "https://server.admin.smartauctionhouse.com/v1";
const APPWRITE_PROJECT = "smart_auction";
const TOKEN_KEY = "adm-appwrite-jwt";
const APPWRITE_API_KEY = "f6b7f09a8d67b0a1cfb64af40e42c08a8b31e2d4a8f3d6e406be6f688b59027842bfae61d550423c405a9799a3fb636042e39e1d6601e308d137c11905a638552a12214c38b2a1421905eabb9b7b032e1effa54f9d6832ea2374fda97d3946f42750d9e3e02c0fe01e315c49b03e0658aabf6a20a3fd19b7acffa6926f980a84"
const SsrHostname: string = 'admin.smartauctionhouse.com';
const AppwriteHostname: string = 'server.admin.smartauctionhouse.com';

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);
const functions = new Functions(appwriteClient);
const databases = new Databases(appwriteClient);
const AppwriteService = {
	signOut: async () => {
		await account.deleteSession('current');
	},
	getAccount: async () => {
		return await account.get<any>();
	},
	setSession: (hash: string) => {
		const authCookies: any = {};
		authCookies['a_session_' + APPWRITE_PROJECT] = hash;
		appwriteClient.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);
	}
};
export { appwriteClient,databases, account, storage, functions, TOKEN_KEY,SsrHostname, AppwriteHostname, AppwriteService,APPWRITE_PROJECT,APPWRITE_URL };

import { ArtistListComp } from "~/components/artist/ArtistListComp";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { appwriteClient } from "~/utility";
import { parseTableParams } from "@refinedev/core";
import { json, LoaderFunction } from "@remix-run/node";
// export const loader: LoaderFunction = async ({ params, request }) => {
//   const { resource } = params;
//   const url = new URL(request.url);

//   const tableParams = parseTableParams(url.search);
//   try {
//     const data = await dataProvider(appwriteClient,{
//       databaseId:"smart_auction"
//     }).getList({
//       resource: resource as string,
//       ...tableParams, // this includes `filters`, `sorters` and `pagination`
//       filters: tableParams.parsedFilters.length > 0 ? [tableParams.parsedFilters[0]] : [],
//     });

//     return json({ initialData: data });
//   } catch (error) {
//     return json({});
//   }
// };
export default function ArtistList() {
  return <ArtistListComp />;
}

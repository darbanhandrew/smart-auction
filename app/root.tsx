import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { notificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/remix-router";

import { ColorModeContextProvider } from "@contexts";
import resetStyle from "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { authProvider } from "~/authProvider";
import { appwriteClient } from "~/utility";
import fa_IR from "antd/lib/locale/fa_IR";
import { ConfigProvider } from "antd";
import { JalaliLocaleListener } from "antd-jalali";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import styles from "./styles.css";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "میزکار حراجی هوشمند",
  viewport: "width=device-width,initial-scale=1",
});
export default function App() {
  dayjs.extend(jalaliday);
  dayjs().calendar("jalali");

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <RefineKbarProvider>
              <ConfigProvider locale={fa_IR} direction="rtl" theme={
                {
                  token: {
                    fontFamily: "Arthall",
                  },
                }
              }>
                <JalaliLocaleListener />
                <Refine
                  routerProvider={routerProvider}
                  dataProvider={dataProvider(appwriteClient, {
                    databaseId: "smart_auction",
                  })}
                  liveProvider={liveProvider(appwriteClient, {
                    databaseId: "smart_auction",
                  })}
                  authProvider={authProvider}
                  notificationProvider={notificationProvider}
                  resources={[
                    {
                      name: "dashboard",
                      list: "/dashboard/",
                      meta: {
                        label: "داشبورد",
                      },
                    },
                    //auction
                    {
                      name: "auction",
                      list: "/auction/",
                      create: "/auction/create",
                      edit: "/auction/edit/:id",
                      show: "/auction/show/:id",
                      meta: {
                        canDelete: true,
                        label: "حراجی ها",
                      },
                    },
                    //auction_house resource
                    {
                      name: "auction_house",
                      list: "/auction_house/",
                      create: "/auction_house/create",
                      edit: "/auction_house/edit/:id",
                      show: "/auction_house/show/:id",
                      meta: {
                        canDelete: true,
                        label: "خانه حراجی",
                      },
                    },
                    //auction_art resource
                    {
                      name: "auction_art",
                      list: "/auction_art/",
                      create: "/auction_art/create",
                      edit: "/auction_art/edit/:id",
                      show: "/auction_art/show/:id",
                      meta: {
                        canDelete: true,
                        label: "آثار حراجی",
                      },
                    },
                    //art resource
                    {
                      name: "art",
                      list: "/art/",
                      create: "/art/create",
                      edit: "/art/edit/:id",
                      show: "/art/show/:id",
                      meta: {
                        canDelete: true,
                        label: "آثار",
                      },
                    },
                    //artist resource
                    {
                      name: "artist",
                      list: "/artist/",
                      create: "/artist/create",
                      edit: "/artist/edit/:id",
                      show: "/artist/show/:id",
                      meta: {
                        canDelete: true,
                        label: "هنرمندان",
                      },
                    },

                    //bid resource
                    {
                      name: "bid",
                      list: "/bid/",
                      create: "/bid/create",
                      edit: "/bid/edit/:id",
                      show: "/bid/show/:id",
                      meta: {
                        canDelete: true,
                        label: "پیشنهادات",
                      },
                    },
                    //art_material resource
                    {
                      name: "art_material",
                      list: "/art_material/",
                      create: "/art_material/create",
                      edit: "/art_material/edit/:id",
                      show: "/art_material/show/:id",
                      meta: {
                        canDelete: true,
                        label: "مواد",
                      },
                    },
                    //art_technique resource
                    {
                      name: "art_technique",
                      list: "/art_technique/",
                      create: "/art_technique/create",
                      edit: "/art_technique/edit/:id",
                      show: "/art_technique/show/:id",
                      meta: {
                        canDelete: true,
                        label: "تکنیک ها",
                      },
                    },
                    //art_category resource
                    {
                      name: "art_category",
                      list: "/art_category/",
                      create: "/art_category/create",
                      edit: "/art_category/edit/:id",
                      show: "/art_category/show/:id",
                      meta: {
                        canDelete: true,
                        label: "دسته بندی ها",
                      },
                    },
                    //bid_step_category
                    {
                      name: "bid_step_category",
                      list: "/bid_step_category/",
                      create: "/bid_step_category/create",
                      edit: "/bid_step_category/edit/:id",
                      show: "/bid_step_category/show/:id",
                      meta: {
                        canDelete: true,
                        label: "گروه بید استپ ها",
                      },
                    },
                    //bid_step
                    {
                      name: "bid_step",
                      list: "/bid_step/",
                      create: "/bid_step/create",
                      edit: "/bid_step/edit/:id",
                      show: "/bid_step/show/:id",
                      meta: {
                        canDelete: true,
                        label: "بیداستپ ها",
                      },
                    },
                    {
                      name: "user",
                      list: "/user/",
                      meta: {
                        label: "کاربران",
                      }
                    }
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                  }}
                >
                  <>
                    <Outlet />
                    <UnsavedChangesNotifier />
                    <RefineKbar />
                  </>
                </Refine>
              </ConfigProvider>
            </RefineKbarProvider>
          </ColorModeContextProvider>
        </RefineKbarProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: resetStyle },
  { rel: "stylesheet", href: styles },
  ];
}

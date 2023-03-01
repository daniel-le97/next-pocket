import { type AppType } from "next/dist/shared/lib/utils";
import React from 'react'
import Layout from "../components/Layout";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
};

export default MyApp;

import { type AppType } from "next/dist/shared/lib/utils";
import React from 'react'

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;

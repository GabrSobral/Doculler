import React from 'react';
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='pt-br'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <body>
        <Main />
        <div id='modal'/>
        <NextScript />
      </body>
    </Html>
  )
}
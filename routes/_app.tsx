import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js")
  );

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        <style>
          {`
            @font-face {
              font-family: 'Gotham';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: url(/live/invoke/website/loaders/asset.ts?src=https://timecenterloja.deco.site/fonts/GothamLight.ttf) format('truetype');
            }

            @font-face {
              font-family: 'Gotham';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url(/live/invoke/website/loaders/asset.ts?src=https://timecenterloja.deco.site/fonts/GothamMedium.ttf) format('truetype');
            }

            @font-face {
              font-family: 'Gotham';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url(/live/invoke/website/loaders/asset.ts?src=https://timecenterloja.deco.site/fonts/GothamBold.ttf) format('truetype');
            }

            @font-face {
              font-family: 'Gotham Book';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(/live/invoke/website/loaders/asset.ts?src=https://timecenterloja.deco.site/fonts/GothamBook.ttf) format('truetype');
            }
          `}
        </style>

       
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});

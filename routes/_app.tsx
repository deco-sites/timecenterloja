import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
const sw = () => {
  if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js");
    navigator.serviceWorker.register("/insider-sw-sdk.js");
  }
};
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

        <link
          rel="canonical"
          href={`${
            ctx.url.origin.replace("http:", "https:")
          }${ctx.url.pathname}`}
        />

        {ctx?.url?.href && <meta property="og:url" content={ctx.url.href} />}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
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
              @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: url(${
              asset("/fonts/Montserrat-Light.ttf")
            }) format('truetype');
            }

            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: url(${
              asset("/fonts/Montserrat-Medium.ttf")
            }) format('truetype');
            }

            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: url(${
              asset("/fonts/Montserrat-Bold.ttf")
            }) format('truetype');
            }

            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(${
              asset("/fonts/Montserrat-Regular.ttf")
            }) format('truetype');
            }
          `,
          }}
        />

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

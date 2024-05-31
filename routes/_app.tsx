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
      navigator.serviceWorker.register("/sw.js"),
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

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Gotham";
                src: url("${
              asset("/fonts/GothamLight.ttf")
            }") format('truetype');
                font-weight: 300;
              }
              @font-face {
                font-family: "Gotham";
                src: url("${
              asset("/fonts/GothamMedium.ttf")
            }") format('truetype');
                font-weight: 500;
              }
              @font-face {
                font-family: "Gotham";
                src: url("${
              asset("/fonts/GothamBold.ttf")
            }") format('truetype');
                font-weight: 700;
              }
              @font-face {
                font-family: "Gotham Book";
                src: url("${
              asset("/fonts/GothamBook.ttf")
            }") format('truetype');
                font-weight: 400;
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

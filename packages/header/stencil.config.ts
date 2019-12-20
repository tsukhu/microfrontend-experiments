import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.tsx", "./src/index.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

//   process.env.NODE_ENV === "production" &&
//          purgecss({
//            content: ["./src/**/*.ts", "./src/**/*.html"],
//            defaultExtractor: content =>
//             content.match(/[A-Za-z0-9-_:/]+/g) || []
//          })

export const config: Config = {
  namespace: "header",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: "src/global/styles.css",
  plugins: [
    postcss({
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production"
          ? [purgecss, require("cssnano")]
          : [])
      ]
    })
  ]
};

//postcss.config.js
const tailwindcss = require("tailwindcss");
import autoprefixer from "autoprefixer";
module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    autoprefixer({
      browsers: ["last 6 versions"],
      cascade: true
    }),
    ...(process.env.NODE_ENV === "production"
      ? [purgecss, require("cssnano")]
      : [])
  ]
};

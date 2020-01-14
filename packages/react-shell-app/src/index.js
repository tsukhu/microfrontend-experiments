import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const microAppConfig = [
  {
    name: "Meetup App",
    type: "widget",
    styles: [
      "http://localhost:7002/global.css",
      "http://localhost:7002/bundle.css"
    ],
    scripts: [
      {
        src: "http://localhost:7002/bundle.js",
        target: "meetups"
      }
    ],
    events: [],
    route: "/meetup"
  },
  {
    name: "googleMap",
    type: "widget",
    styles: [],
    scripts: [
      {
        src: "https://maps.googleapis.com/maps/api/js",
        target: "googleMaps"
      }
    ],
    events: [],
    route: "/"
  },
  {
    name: "Hello Svelte",
    type: "web-component",
    styles: [],
    scripts: [
      {
        src: "http://localhost:5000/bundle.js",
        target: "svelteHello"
      }
    ],
    events: [
      {
        name: "svelteEvent"
      }
    ],
    route:"/hello-svelte"
  }
];

ReactDOM.render(
  <App config={microAppConfig} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

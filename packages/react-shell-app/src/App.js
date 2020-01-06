import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";
// import SvelteComponent from 'react-svelte';
import loadModule from "./loadModule";
import GoogleMap from "./GoogleMap";

const microAppConfig = [
  {
    name: "Navibar",
    type: "web-component",
    styles: [
    ],
    scripts: [
      {
        src: "http://localhost:7001/header/header.js",
        target: "appHeader"
      }
    ],
    events: []
  },
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
        target: "meetupApp"
      }
    ],
    events: []
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
    ]
  }
];
function App() {
  const [mapsReady, setMapsReady] = useState(false);
  const [headerReady, setHeaderReady] = useState(false);
  const [svelteReady, setSvelteReady] = useState(false);
  const [meetupReady, setMeetupReady] = useState(false);
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  const [globalStylesReady, setGlobalStylesReady] = useState(false);
  const [meetupStylesReady, setMeetupStylesReady] = useState(false);
  const svelteRef = useRef(null);
  const [svelteListener, setSvelteListener] = useState(null);

  // let svelteRef = React.createRef();

  useEffect(() => {
    if (globalStylesReady === false) {
      loadModule(
        "http://localhost:7002/global.css",
        "css",
        "meetupApp",
        () => {
          // Work to do after the library loads.
          setGlobalStylesReady(true);
        },

        () => {
          console.log("Unable to load global styles");
          setGlobalStylesReady(false);
        }
      );
    }

    if (meetupStylesReady === false) {
      loadModule(
        "http://localhost:7002/bundle.css",
        "css",
        "meetupApp",
        () => {
          // Work to do after the library loads.
          setMeetupStylesReady(true);
        },

        () => {
          console.log("Unable to load global styles");
          setGlobalStylesReady(false);
        }
      );
    }
  }, [globalStylesReady, meetupStylesReady]);
  useEffect(() => {
    if (meetupReady === false) {
      loadModule("http://localhost:7002/bundle.js", null, "meetupApp", () => {
        // Work to do after the library loads.
        setMeetupReady(true);
      });
    }
  }, [meetupReady]);

  useEffect(() => {
    if (svelteReady === true && svelteListener === null) {
      console.log("svelteReady", svelteRef.current);
      if (!svelteListener) {
        const listener = svelteRef.current.addEventListener("svelteEvent", () =>
          console.log("Received")
        );
        setSvelteListener(listener);
      }
    }

    if (svelteReady === false) {
      loadModule("http://localhost:5000/bundle.js", null, "svelteHello", () => {
        // Work to do after the library loads.
        setSvelteReady(true);
      });
    }
  }, [svelteListener, svelteReady]);

  useEffect(() => {
    if (!headerReady) {
      console.log("called");
      loadModule(
        "http://localhost:7001/header/header.js",
        null,
        "my-header",
        () => {
          setHeaderReady(true);
        },
        () => {
          console.log("Header not found");
          setHeaderReady(false);
        }
      );
    }
  }, [headerReady]);

  useEffect(() => {
    if (mapsReady === false) {
      loadModule(
        "https://maps.googleapis.com/maps/api/js",
        null,
        "googleMaps",
        () => {
          // Work to do after the library loads.
          if (typeof window.google !== "undefined") {
            setMapsReady(true);
          } else {
            setMapsReady(false);
          }
        },
        () => {
          setMapsReady(false);
        }
      );
    }
  }, [mapsReady]);

  console.log(headerReady);
  return (
    <section>
      <div className="container max-w-full max-h-full mx-0 p-0">
        {headerReady && (
          <my-component
            first="Stencil"
            last="'Don't call me a framework' JS"
          ></my-component>
        )}
        {!headerReady && (
          <div
            style={{ fontSize: "5rem", padding: 5, margin: 0, lineHeight: 0 }}
          >
            {" "}
            <Skeleton />{" "}
          </div>
        )}
        <div className="">
          {svelteReady && (
            <hello-svelte name="Svelte!" ref={svelteRef}></hello-svelte>
          )}
          {!svelteReady && (
            <div
              style={{ fontSize: "5rem", padding: 5, margin: 0, lineHeight: 0 }}
            >
              {" "}
              <Skeleton />{" "}
            </div>
          )}
        </div>
        <div className="p-2 border border-gray-400 border-solid rounded">
          {mapsReady && (
            <div>
              <span className="py-2 px-4 text-left font-bold">
                Map me!
                <button
                  onClick={() => {
                    setLat(40.7128);
                    setLng(-74.0059);
                  }}
                  className="m-2 bg-red hover:bg-white hover:text-red text-white font-bold py-2 px-4 border border-red rounded"
                >
                  {" "}
                  New York
                </button>
              </span>
              <div className="w-full h-screen">
                <GoogleMap lat={lat} lng={lng} />
              </div>
            </div>
          )}
          {!mapsReady && (
            <div
              style={{
                fontSize: "20rem",
                padding: 5,
                margin: 0,
                lineHeight: 0
              }}
            >
              {" "}
              <Skeleton />{" "}
            </div>
          )}
        </div>
      </div>
      <div id="meetups"></div>
      {!meetupReady && (
        <div
          style={{ fontSize: "20rem", padding: 5, margin: 0, lineHeight: 0 }}
        >
          {" "}
          <Skeleton />{" "}
        </div>
      )}
    </section>
  );
}

export default App;

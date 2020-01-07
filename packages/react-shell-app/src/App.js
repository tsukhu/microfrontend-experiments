import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./App.css";
import MFELoader from "./MFELoader";
import GoogleMap from "./GoogleMap";

const App = props => {
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  const svelteRef = useRef();
  const [svelteListener, setSvelteListener] = useState(null);

  useLayoutEffect(() => {
    if (svelteListener === null) {
      console.log("svelteReady", svelteRef.current);
      setTimeout(() => {
        if (svelteListener === null && svelteRef.current) {
          const listener = svelteRef.current.addEventListener("svelteEvent", () =>
            console.log("Received")
          );
          setSvelteListener(listener);
        }
      }, 1000 )
    
    }
  }, [svelteListener,svelteRef]);

  const getSlotContents = app => {
    if (app.name === "googleMap") {
      return (
        <div className="p-2 border border-gray-400 border-solid rounded">
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
        </div>
      );
    } else if (app.name === "Navigation bar") {
      return (
        <my-component
          first="Stencil"
          last="'Don't call me a framework' JS"
        ></my-component>
      );
    } else if (app.name === "Hello Svelte") {
      return <hello-svelte name="Svelte!" ref={svelteRef}></hello-svelte>;
    }
    return null;
  };

  return (
    <section>
      <div className="container max-w-full max-h-full mx-0 p-0">
        {props.config.map(app => {
          return (
            <MFELoader config={app} key={app.name}>
              {getSlotContents(app)}
            </MFELoader>
          );
        })}
      </div>
    </section>
  );
};

export default App;

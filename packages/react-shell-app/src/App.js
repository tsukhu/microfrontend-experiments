import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import loadModule from "./loadModule";
import MFELoader from "./MFELoader";
import GoogleMap from "./GoogleMap";

const App = props => {
  const [headerReady, setHeaderReady] = useState(false);
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  const svelteRef = useRef();
  const [svelteListener, setSvelteListener] = useState(null);
  useEffect(() => {
    loadModule(
      "http://localhost:7001/header/header.js",
      null,
      "mainNav",
      "my-header",
      () => {
        console.log("ready");
        setHeaderReady(true);
      },
      () => {
        console.log("Header not found");
        setHeaderReady(false);
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (svelteListener === null) {
      console.log("svelteReady", svelteRef.current);
      setTimeout(() => {
        if (svelteListener === null && svelteRef.current) {
          const listener = svelteRef.current.addEventListener(
            "svelteEvent",
            () => console.log("Received")
          );
          setSvelteListener(listener);
        }
      }, 1000);
    }
  }, [svelteListener, svelteRef]);

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
    } else if (app.name === "Hello Svelte") {
      return <hello-svelte name="Svelte!" ref={svelteRef}></hello-svelte>;
    }
    return null;
  };

  return (
    <>
      {headerReady && (
        <Router>
          <nav-container>
            <div slot="main-content">
              <section>
                <Switch>
                  {props.config.map(app => {
                    return (
                      <Route exact path={app.route} key={app.name}>
                        <MFELoader config={app}>
                          {getSlotContents(app)}
                        </MFELoader>
                      </Route>
                    );
                  })}
                </Switch>
                {/* 
              <div className="flex-1 max-w-full max-h-full mx-0 p-0">
                {props.config.map(app => {
                  return (
                    <MFELoader config={app} key={app.name}>
                      {getSlotContents(app)}
                    </MFELoader>
                  );
                })}
              </div> */}
              </section>
            </div>
          </nav-container>
        </Router>
      )}
    </>
  );
};

export default App;

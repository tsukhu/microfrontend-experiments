import React, { useState, useEffect } from "react";
import "./App.css";
import loadModule from "./loadModule";
import GoogleMap from "./GoogleMap";

function App() {
  const [mapsReady, setMapsReady] = useState(false);
  const [headerReady, setHeaderReady] = useState(false);
  const [svelteReady, setSvelteReady] = useState(false);
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);

  useEffect(() => {
    this.refs.svelteRef.addEventListener("svelteEvent", () => alert("Got it"));

    loadModule("https://maps.googleapis.com/maps/api/js", "googleMaps", () => {
      // Work to do after the library loads.
      setMapsReady(true);
    });
    loadModule("http://localhost:5000/bundle.js", "svelteHello", () => {
      // Work to do after the library loads.
      setSvelteReady(true);
    });
    loadModule(
      "http://localhost:8080/header/header.js",
      "my-header",
      () => {
        setHeaderReady(true);
      },
      () => {
        console.log("Header not found");
        setHeaderReady(false);
      }
    );
  }, []);

  return (
    <div style={{ height: "800px" }}>
      {headerReady && (
        <my-component
          first="Stencil"
          last="'Don't call me a framework' JS"
        ></my-component>
      )}
      {svelteReady && (
        <hello-svelte
          name="Svelte!"
          ref={elem => (this.svelteRef = elem)}
        ></hello-svelte>
      )}
      Map me!
      <button
        onClick={() => {
          setLat(40.7128);
          setLng(-74.0059);
        }}
      >
        {" "}
        New York
      </button>
      {mapsReady && <GoogleMap lat={lat} lng={lng} />}
    </div>
  );
}

export default App;

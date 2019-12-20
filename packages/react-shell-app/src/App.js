import React, { useState, useEffect } from "react";
import "./App.css";
import loadModule from "./loadModule";
import GoogleMap from "./GoogleMap";

function App() {
  const [mapsReady, setMapsReady] = useState(false);
  const [headerReady, setHeaderReady] = useState(false);
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);

  useEffect(() => {
    loadModule("https://maps.googleapis.com/maps/api/js", "googleMaps", () => {
      // Work to do after the library loads.
      setMapsReady(true);
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

import React, { useState, useEffect } from "react";
import "./App.css";
import loadGoogleMaps from "./load_google_maps";
import GoogleMap from "./google_map";

function App() {
  const [mapsReady, SetMapsReady] = useState(false);
  const [lat, SetLat] = useState(-34.397);
  const [lng, SetLng] = useState(150.644);

  useEffect(() => {
    loadGoogleMaps(() => {
      // Work to do after the library loads.
      SetMapsReady(true);
    });
  }, []);

  return (
    <div style={{ height: "800px" }}>
      Map me!
      <button onClick={() => {
        SetLat(40.7128);
        SetLng(-74.0059)
      }}> New York</button>
      {mapsReady && <GoogleMap lat={lat} lng={lng} />}
    </div>
  );
}

export default App;

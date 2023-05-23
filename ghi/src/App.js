import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";
import Nav from "./components/Nav";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/signup" element={<SignupForm />} />

            <Route path="/login" element={<LoginForm />} />
              {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 39.5, lng: -98.35 }), []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="">
      <Nav />
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* <div className="rounded-2xl h-4/5 w-4/5 flex items-center justify-center">
          <GoogleMap
            zoom={5.3}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div> */}
      </div>
    </div>
  );
}
export default App;

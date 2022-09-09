import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadHatsAndShoes() {
  const hatsResponse = await fetch('http://localhost:8090/api/hats/');
  const shoesResponse = await fetch("http://localhost:8080/api/shoes/");

  if (hatsResponse.ok && shoesResponse.ok) {
    const hatsData = await hatsResponse.json();
    const shoesData = await shoesResponse.json();
    root.render(
      <React.StrictMode>
        <App hats={hatsData.hats} shoes={shoesData.shoes}/>
      </React.StrictMode>
    );
  } else {
    console.error(hatsResponse || shoesResponse);

  }
}

loadHatsAndShoes()

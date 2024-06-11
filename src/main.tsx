import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import RiderCardsContextProvider from "./context/RiderCardsContextProvider.tsx";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RiderCardsContextProvider>
      <Theme>
        <App />
      </Theme>
    </RiderCardsContextProvider>
  </React.StrictMode>
);

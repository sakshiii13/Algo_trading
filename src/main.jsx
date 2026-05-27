import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import PageLoader from "./components/loader/PageLoader.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}>
        <PageLoader />
        <App />
      </Provider>
    </BrowserRouter>
);

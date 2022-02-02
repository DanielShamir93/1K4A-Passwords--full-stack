import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const App = React.lazy(() => import("./App"));
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import "./styles/normalize.css";
import "./styles/reset.css";
import "./styles/reset.mobile.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense fallback={<span>Waiting....</span>}>
            <App />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

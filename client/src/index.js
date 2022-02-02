import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import Spinner from "./components/spinner/Spinner.component";
import "./styles/normalize.css";
import "./styles/reset.css";
import "./styles/reset.mobile.css";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

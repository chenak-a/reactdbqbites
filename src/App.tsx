import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "urql";
import { client } from "./urqlClient";
import Dashbord from "./Dashbord";
import Home from "./Home";
import Pagenotfound from "./Pagenotfound";
function App() {

  return (
    <div className="App">
      <Provider value={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Pagenotfound />} />
            <Route path="/:id"  element={<Dashbord />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

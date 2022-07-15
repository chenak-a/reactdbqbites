import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import { Provider } from "urql";
import { client } from "./urqlClient";
import Home from './Home';

function App() {
  //<Route path="/:id" exact component={itimes} />
  return (
    <div className="App">
      <Provider value={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home />} />

          </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
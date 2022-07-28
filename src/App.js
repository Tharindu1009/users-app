import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Users from "./pages/users";
import UserProfile from "./pages/user-profile";

function App() {

  const history = createBrowserHistory({ basename: '/' });

  const routes = (
    <Routes>
          <Route exact path="/" element={<Users/>} />
          <Route exact path="/user/:id" element={<UserProfile/>} />
    </Routes>
  );

  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}

export default App;
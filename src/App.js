import Header from "./Header";
import Home from "./Home";
import "./App.css";
import Room from "./Room";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import CreateRoom from "./CreateRoom";
import Account from "./Account";
import { AuthProvider } from "./Auth";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/Room/:id" component={Room}></Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/createRoom"></Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

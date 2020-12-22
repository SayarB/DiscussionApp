import Header from "./Header";
import Home from "./Home";
import "./App.css";
import Room from "./Room";
import EnterPassword from "./EnterPassword";
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
            <Route path="/Room/:id">
            
              <Room />
            </Route>
            <Route path="/EnterPassword/:id" component={EnterPassword}></Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/createRoom">
              <CreateRoom />
            </Route>
            <Route path="/">
              <Header className="Header" />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

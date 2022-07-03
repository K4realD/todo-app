import Main from "../components/smart/Main.js"
import Task from "../components/smart/Task.js";
import { Route, Switch } from "react-router-dom";

function App() {
 


  return (
    <div className="page">
      <Switch>
      <Route exact path="/">
        <Main/>
      </Route>
      <Route path="/:id">
        <Task />
      </Route>
      </Switch>
    </div>
  );
}

export default App;

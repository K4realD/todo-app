import Main from "./Main.js"
import Task from "./Task.js";
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

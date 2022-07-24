import './App.css'
import Main from "../Main/Main.js"
import Task from "../Task/Task.js";
import Layout from '../Layout/Layout.js';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path="/:id" element={<Task />} />
      </Route>
      </Routes>
    </div>
  );
}

export default App;

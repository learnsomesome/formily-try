import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Link to="/search">Search</Link>
      <br />
      <br />
      <Link to="/regist">Registration</Link>
      <br />
      <br />
      <Link to="/table">Table</Link>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import MainWrp from "./layout/MainWrp";
import Application from "./component/Application";

function App() {
  return (
    <div className="App">
      <Application>
        <MainWrp />
      </Application>
    </div>
  );
}

export default App;

import './App.css';
import Canvas from "./components/Canvas/Canvas.js"
import Sidebar from './components/Sidebar/Sidebar';
import Logo from "./components/Logo/Logo"

function App() {
  return (
    <div className="App">
      <Canvas/>
      <Logo/>
    </div>
  );
}

export default App;

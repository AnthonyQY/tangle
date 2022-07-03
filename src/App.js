import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

import Canvas from "./components/Canvas/Canvas.js"
import Logo from "./components/Logo/Logo"

function App() {
  library.add(faCircleQuestion)
  return (
    <div className="App">
      <Canvas/>
      <Logo/>
    </div>
  );
}

export default App;

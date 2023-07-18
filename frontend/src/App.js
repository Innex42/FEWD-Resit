import 'leaflet/dist/leaflet.css';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import ComparePage from './components/ComparePage';
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/Compare' element={<ComparePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

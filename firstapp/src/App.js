import './App.css';
import Navheader from './Components/Navheader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipelist from './pages/Recipelist';
import Login from './pages/Login';
import Signin from './pages/Signin';

function App() {
  return (
    <div className="App">
      <Router>
        <Navheader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/recipelist" element={<Recipelist />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Navheader from './Components/Navheader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipelist from './pages/Recipelist';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import { AuthContextProvider } from './firebase/Auth';
import Signout from './Components/Signout';
import Suggestion from './pages/Suggestion';
import Articles from './pages/Articles';
import PopularRecipe from './pages/PopularRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
      <Router>
        <Navheader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/recipelist" element={<Recipelist />} />
          <Route path='/suggestion' element={<Suggestion />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signOut' element={<Signout />} />
          <Route path='/popularRecipe' element={<PopularRecipe />} />
          <Route path='/savedRecipes' element={<SavedRecipe/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </Router>
      {/* </AuthContextProvider> */}

    </div>
  );
}
export default App;
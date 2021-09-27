
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import NewMoviesList from './pages/newmovieslist/NewMoviesList';
import Navigation from '../src/nav/Navigation'
import SingleMovie from './pages/newmovieslist/singleMovie/SingleMovie';
function App() {
  return (
    <Router >
<Navigation/>
      <Switch>

        <Route exact path="/"><NewMoviesList/></Route>
        <Route exact path="/:singleMovieId"><SingleMovie/></Route>
      </Switch>
    </Router>
  );
}

export default App;

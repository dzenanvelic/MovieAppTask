
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import NewMoviesList from './pages/newmovieslist/NewMoviesList';
import Navigation from '../src/nav/Navigation'
import SingleMovie from './pages/newmovieslist/singleMovie/SingleMovie';
import Home from './pages/home/Home';
import Series from './pages/series/Series';
import SingleSerie from './pages/singleSerie/SingleSerie';
function App() {
  return (
    <Router >
<Navigation/>
      <Switch>

        <Route exact path="/"><Home/></Route>
        <Route exact path="/movies"><NewMoviesList/></Route>
        <Route exact path="/series"><Series/></Route>
        <Route exact path="/:singleMovieId"><SingleMovie/></Route>
        <Route exact path="/serie/:singleSerieId"><SingleSerie/></Route>
      </Switch>
    </Router>
  );
}

export default App;

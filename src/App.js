import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';
import TeamDetails from './views/Teams/TeamDetails.jsx';
import TeamsList from './views/Teams/TeamsList.jsx';
import PlayerDetails from './views/Players/PlayerDetails.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';

function App() {
  return (
  <BrowserRouter>
      <div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/teams'>Teams</NavLink>
        </nav>

        <Switch>
          <Route exact path="/teams" component={TeamsList} />
          <Route exact path="/team/:id" component={TeamDetails} />
          <Route exact path="/player/:id" component={PlayerDetails}/>
          <Route exact path="/" component={LandingPage}/>
        </Switch>
      </div>
  </BrowserRouter>
  )
}

export default App;

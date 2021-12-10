import './App.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';
import TeamDetails from './views/Teams/TeamDetails.jsx';
import TeamsList from './views/Teams/TeamsList.jsx';
import PlayerDetails from './views/Players/PlayerDetails.jsx';
import PlayersList from './views/Players/PlayersList.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import AddTeam from './views/Teams/AddTeam.jsx';

function App() {
  return (
  <BrowserRouter>
      <div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/teams'>Teams</NavLink>
          <NavLink to='/players'>Players</NavLink>
          {/* Could provide a navlink to add team or add player */}
        </nav>

        <Switch>
          <Route exact path="/teams" component={TeamsList} />
          <Route exact path="/teams/add" component={AddTeam} />
          <Route exact path="/teams/:id" component={TeamDetails} />
          <Route exact path="/players" component={PlayersList} />
          <Route exact path="/players/:id" component={PlayerDetails}/>
          <Route exact path="/" component={LandingPage}/>
        </Switch>
      </div>
  </BrowserRouter>
  )
}

export default App;

import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddTeam from './AddTeam';
import TeamDetails from './TeamDetails.jsx';

const mockTeam = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  city: 'okay',
  state: 'go',
  players: []
};

const server = setupServer(
  rest.get(
    'https://bmvgpxsbwlwuetqtoczm.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  ),
  rest.post(
    'https://bmvgpxsbwlwuetqtoczm.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json([mockTeam]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should add a team and redirect to the team detail page', async () => {
  const history = createMemoryHistory();
  history.push('/teams/add');

  render(
    <Router history={history}>
      <Route path='/teams/add'>
        <AddTeam />
      </Route>
      <Route path='/teams/:id' component={TeamDetails} />
    </Router>
  );

  screen.getByText(/Add Team/i);

  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitBtn = screen.getByRole('button', { name: /Add team/i });

// THIS BLOCK OF CODE MEANS NOTHING!!!!!!!!!!!!!!!
// NONE OF THIS DATA WILL GO TO THE DB.
// IF THE INPUT DOESN'T EXIST WILL THIS AT LEAST THROW AN ERROR???????
// THESE LINES CAUSED ERRORS FOR ZACK BECAUSE THEY CHANGED STATE!!!
  userEvent.type(nameField, 'My New Team');
  userEvent.type(cityField, 'Anytown');
  userEvent.type(stateField, 'US');
//THIS IS THE ONLY LINE IN THIS BLOCK THAT ACTUALLY DOES SOMETHING MEANINGFUL!?
// BUT.... Sarani and Katie WERE ABLE TO PASS THE TEST BY REMOVING JUST. THIS. LINE. 
  userEvent.click(submitBtn);

  await screen.findByText(/redirect me/i);
});

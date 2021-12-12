import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddPlayer from './AddPlayer';
import PlayerDetails from './PlayerDetails.jsx';

window.alert = jest.fn();

const mockPlayerObj = {
    id: 6,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'redirect me!',
    city: 'okay',
    state: 'go',
    players: []
};

const mockTeamArr = [{
    id: 6,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'redirect me!',
    city: 'okay',
    state: 'go',
    players: []
}]

const server = setupServer(
    rest.get(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/players`,
        (req, res, ctx) => {
        return res(ctx.json(mockPlayerObj));
        }
    ),
    rest.get(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/teams`,
        (req, res, ctx) => {
        return res(ctx.json(mockTeamArr));
        }
    ),
    rest.post(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/players`,
        (req, res, ctx) => {
        return res(ctx.json([mockPlayerObj]));
        }
    )
);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

it('should add a player and redirect to the player detail page', async () => {
    window.alert.mockClear();
    const history = createMemoryHistory();
    history.push('/players/add');

    render(
        <Router history={history}>
        <Route path='/players/add'>
            <AddPlayer />
        </Route>
        <Route path='/players/:id' component={PlayerDetails} />
        </Router>
    );

    screen.getByText(/Add Player/i);

    const nameField = screen.getByLabelText(/name/i);
    const positionField = screen.getByLabelText(/position/i);
    const submitBtn = screen.getByRole('button', { name: /Add Player/i });

    // THIS BLOCK OF CODE MEANS NOTHING!!!!!!!!!!!!!!!
    // NONE OF THIS DATA WILL GO TO THE DB.
    // IF THE INPUT DOESN'T EXIST WILL THIS AT LEAST THROW AN ERROR???????
    // THESE LINES CAUSED ERRORS FOR ZACK BECAUSE THEY CHANGED STATE!!!
    userEvent.type(nameField, 'My New Name');
    userEvent.type(positionField, 'Anyposition');
    //THIS IS THE ONLY LINE IN THIS BLOCK THAT ACTUALLY DOES SOMETHING MEANINGFUL!?
    // BUT.... Sarani and Katie WERE ABLE TO PASS THE TEST BY REMOVING JUST. THIS. LINE. 
    userEvent.click(submitBtn);

    await screen.findByText(/redirect me/i);
});

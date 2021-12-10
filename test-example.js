import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddTeam from './AddTeam';
import TeamDetail from './TeamDetail';

// The object we will recieve from our mocked API request
const mockTeam = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  city: 'okay',
  state: 'go',
  players: []
};

// A server we can use to listen for api calls. 
const server = setupServer(
  // the rest 'module/class' allows us to make a restful api call. 
    // - this .get method takes in two parameters, the route we are mocking and the req/res/ctx handler.
  rest.get(
    // the api route we are mocking.
    'https://kyymosibdiehskestqsg.supabase.co/rest/v1/teams',
    // req === request (what the client is sending to the server)
    // res === response (what the server sends back to the client once it's recieved and attempted to process the request)
    // ctx === context (contains a set of response transformers/translators to compose a mocked response)
    (req, res, ctx) => {
      // return the response with a .json context handler. 
      return res(ctx.json(mockTeam));
    }
  ),
  rest.post(
    'https://kyymosibdiehskestqsg.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json([mockTeam]));
    }
  )
);

// before all tests, launch and listen on the server for communication
beforeAll(() => {
  server.listen();
});

// after all the tests, close the server-no need to listen when we aren't using it.
afterAll(() => {
  server.close();
});

// This test is meant to mock a full behavior on the app. This means we must include and consider all parts of the application we are using that need to be recreated here for successful testing.
it('should add a team and redirect to the team detail page', async () => {
  // Create a history array. This is important for the expressed purpose of the redirect. Inside of the AddTeam component we redirect the user after they've triggered a successful submit event. 
  const history = createMemoryHistory();
  // push the current teams path into the history array, making it the current value(what the user sees) 
  history.push('/teams/new');

  // render fn allows us to isolate and render components and elements.
  render(
    // Recreate the router from app.js to enable us to manipulate the page the user is seeing. 
    <Router history={history}>
      {/* Because we've pushed /teams/new to the history array, the route below will trigger and render the AddTeam component. */}
      <Route path='/teams/new'>
        <AddTeam />
      </Route>
      {/* This path must be included so that the redirect functionality within the AddTeam component is successful. Without this, the application/test wouldn't know where to take the user because it has no path to reference and trigger rendering */}
      <Route path='/teams/:id' component={TeamDetail} />
    </Router>
  );

  // This is an implicit approach. .getByText() method will throw an error if the text doesn't exist, which will automatically fail the whole test.
  // If we wanted to be explicit, we would assign the line below to a variable, then use the 'expect(<getByTextVariable>).toBeInTheDocument()' syntax.
  screen.getByText('Add a Team');


  // I believe this block of code grabs the relevant elements/nodes from the screen to be used in the next block of code. 
  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitBtn = screen.getByRole('button', { name: 'Add a team' });

// This block of code mocks the users behavior. Taking in the retrieved elements/nodes from the block of code above and triggering events via 'filling out inputs and clicking the submit button'. 
  userEvent.type(nameField, 'My New Team');
  userEvent.type(cityField, 'Anytown');
  userEvent.type(stateField, 'US');
  userEvent.click(submitBtn);

  // asynchronously wait for the rest of the code to execute, which should redirect the user to a new page, where we can try to find the 'redirect me!' text. 
  // This is also implicit, if the text is not found then it will throw an error and cause the test to fail. 
  await screen.findByText('redirect me!');
});
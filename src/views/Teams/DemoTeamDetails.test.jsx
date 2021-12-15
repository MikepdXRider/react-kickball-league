import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import DemoTeamDetails from './DemoTeamDetails';

const mockTeam1 = {
  id: 1,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'My Team',
  city: 'Anytown',
  state: 'US',
  players: [],
};

const server = setupServer(
  rest.get('https://bmvgpxsbwlwuetqtoczm.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam1))
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should render a detailed view of an individual team', async () => {
  render(
    <MemoryRouter>
      <DemoTeamDetails
        label='The value of the label prop...'
        match={{ params: { teamId: '3' } }}
      />
    </MemoryRouter>
  );

  screen.getByText('Loading team...');
// await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  const teamName = await screen.findByText('My Team', {
    exact: false,
  });
  const customLabel = screen.getByText('The value of the label prop...');

  expect(teamName).toBeInTheDocument();
  expect(customLabel).toBeInTheDocument();
});
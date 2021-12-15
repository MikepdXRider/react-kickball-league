import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter, Route } from "react-router";
import TeamDetails from "./TeamDetails.jsx";


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
));

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

it('renders TeamDetails page', async () => {
    const { container } = render(
    <MemoryRouter initialEntries={[`/teams/1`]}>  
        <Route path='/teams/:id'>
            <TeamDetails />
        </Route>
    </MemoryRouter>
    )
    const teamName = await screen.findByText(/redirect me/i);
    // await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

    expect(teamName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
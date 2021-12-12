import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import TeamsList from "./TeamsList.jsx";

//need to mock out the server for this to work again. 
const mockTeamArr = [{
    id: 6,
    created_at: '2021-12-08T20:26:24.408898+00:00',
    name: 'redirect me!',
    city: 'okay',
    state: 'go',
    players: []
}];

const server = setupServer(
    rest.get(
        'https://bmvgpxsbwlwuetqtoczm.supabase.co/rest/v1/teams',
        (req, res, ctx) => {
        return res(ctx.json(mockTeamArr));
    }),
    rest.post(
        'https://bmvgpxsbwlwuetqtoczm.supabase.co/rest/v1/teams',
        (req, res, ctx) => {
        return res(ctx.json([mockTeamArr]));
    })
    );

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});
it('renders TeamsList page w/ data from api', async () => {
    const { container } = render(
            <MemoryRouter>
                <TeamsList />
            </MemoryRouter>
        )
    // count nest line 14 in waitFor() - maybe. 
    const teamName = await screen.findByText(/Add Team/i);

    expect(teamName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
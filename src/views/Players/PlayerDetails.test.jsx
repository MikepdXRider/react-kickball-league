import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import PlayerDetails from "./PlayerDetails.jsx";


it ('renders PlayerDetails page', async () => {
    const { container } = render(
    <MemoryRouter initialEntries={[`/players/1`]}>  
        <Route path='/players/:id'>
            <PlayerDetails />
        </Route>
    </MemoryRouter>
    )
    const playerName = await screen.findByText(/Ben E. Jetts/i);

    expect(playerName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
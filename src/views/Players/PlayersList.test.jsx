import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlayersList from "./PlayersList.jsx";

//need to mock out the server for this to work again. 
it.skip ('renders PlayersList page', async () => {
    const { container } = render(
            <MemoryRouter>
                <PlayersList />
            </MemoryRouter>
        )
    // count nest line 14 in waitFor() - maybe. 
    const playerName = await screen.findByText(/Add Player/i);

    expect(playerName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
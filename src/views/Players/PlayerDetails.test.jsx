import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import PlayerDetails from "./PlayerDetails.jsx";


it ('renders PlayerDetils', async () => {
    const { container } = render(
    <MemoryRouter initialEntries={[`/players/1`]}>  
        <Route path='/players/:id'>
            <PlayerDetails />
        </Route>
    </MemoryRouter>
    )
    const title = await screen.findByText(/Ben E. Jetts/i);

    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
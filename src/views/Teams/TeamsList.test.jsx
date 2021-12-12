import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import TeamsList from "./TeamsList.jsx";

//need to mock out the server for this to work again. 
it.skip('renders TeamsList page', async () => {
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
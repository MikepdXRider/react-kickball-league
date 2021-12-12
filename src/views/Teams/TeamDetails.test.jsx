import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import TeamDetails from "./TeamDetails.jsx";

it ('renders TeamDetails page', async () => {
    const { container } = render(
    <MemoryRouter initialEntries={[`/teams/1`]}>  
        <Route path='/teams/:id'>
            <TeamDetails />
        </Route>
    </MemoryRouter>
    )
    // const teamName = await screen.findByText(/Loading/i);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(container).toMatchSnapshot();
})
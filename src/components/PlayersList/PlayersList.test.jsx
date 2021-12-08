import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PlayersList from "./PlayersList.jsx";


const playersDataArr = [{
    created_at: 'test-utc',
    id: 1,
    name: 'test-name',
    team_id: 3
}]

it ('renders PlayersList component', () => {
    const { container } = render(
    <MemoryRouter>
        <PlayersList playersDataArr={playersDataArr} /> 
    </MemoryRouter>
    )
    const playerName = screen.getByText(playersDataArr[0].name);

    expect(playerName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
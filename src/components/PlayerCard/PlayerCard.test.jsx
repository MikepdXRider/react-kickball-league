import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import PlayerCard from "./PlayerCard.jsx";


const playerDataObj = {
    created_at: 'test-utc',
    id: 1,
    name: 'test-name',
    team_id: 3
}

it('renders PlayerCard component', () => {
    const { container } = render(<PlayerCard playerDataObj={playerDataObj} /> )
    const playerName = screen.getByText(playerDataObj.name);

    expect(playerName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
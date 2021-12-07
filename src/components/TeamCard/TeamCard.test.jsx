import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import TeamCard from "./TeamCard.jsx";


const teamDataObj = {
    created_at: 'test-utc',
    id: 1,
    name: 'test-name',
    team_id: 3
}

it ('renders TeamCard', () => {
    const { container } = render(<TeamCard teamDataObj={teamDataObj} /> )
    const teamName = screen.getByText(teamDataObj.name);

    expect(teamName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
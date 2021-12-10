import { render, screen } from "@testing-library/react"
import PlayerForm from "./PlayerForm.jsx"


const testProps = {
    edit: false,
    playerNameStr: 'test-name',
    playerPositionStr: 'test-state',
    playerTeamIdNum: 1,
    setPlayerTeamIdNum: 'test-fn',
    setPlayerNameStr: 'test-fn',
    setPlayerPlayerStr: 'test-fn',
    submitFn: 'test-fn',
    teamDataArr: [{id: 1, name: 'test-team'}]
}

it('renders PlayerForm component', () =>{
    const { container } = render(<PlayerForm {...testProps} />)
    const text = screen.getByText(/add player/i);

    expect(container).toMatchSnapshot();
    expect(text).toBeInTheDocument();
})
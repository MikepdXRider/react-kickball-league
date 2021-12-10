import { render, screen } from "@testing-library/react"
import TeamForm from "./TeamForm.jsx"


const testProps = {
    edit: false,
    teamNameStr: 'test-name',
    teamCityStr: 'test-city',
    teamStateStr: 'test-state',
    setTeamNameStr: 'test-fn',
    setTeamCityStr: 'test-fn',
    setTeamStateStr: 'test-fn',
    submitFn: 'test-fn'
}

it('renders TeamForm component', () =>{
    const { container } = render(<TeamForm {...testProps} />)
    const text = screen.getByText(/add team/i);

    expect(container).toMatchSnapshot();
    expect(text).toBeInTheDocument();
})
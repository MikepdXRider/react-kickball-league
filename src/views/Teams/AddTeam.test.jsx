import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import AddTeam from "./AddTeam.jsx";

it ('renders AddTeam page', async () => {
    const { container } = render(<AddTeam />)
    const text = await screen.findByText(/Add Team/i);

    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
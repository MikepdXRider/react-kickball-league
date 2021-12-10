import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import AddPlayer from "./AddPlayer.jsx";

it ('renders AddPlayer page', async () => {
    const { container } = render(<AddPlayer />)
    const text = await screen.findByText(/Add Player/i);

    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
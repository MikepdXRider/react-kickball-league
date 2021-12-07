import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LandingPage from "./LandingPage.jsx";

it ('renders PlayerCard', () => {
    const { container } = render(
    <MemoryRouter>
        <LandingPage />
    </MemoryRouter>
     )
    const title = screen.getByText('Welcome to the kickball league!');
    // or...
    // const title = screen.getByText(/welcome to the kickball league/i);
    

    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
})
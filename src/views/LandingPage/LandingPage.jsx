import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <section>
            <h1>Welcome to the kickball league!</h1>
            <Link to='/teams'>Teams List!</Link>
        </section>
    )
}

export default LandingPage

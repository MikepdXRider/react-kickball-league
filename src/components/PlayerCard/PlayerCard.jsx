import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function PlayerCard({playerDataObj}) {
    return (
        <Link to={`/player/${playerDataObj.id}`}>
            <article>
                <h3>{playerDataObj.name}</h3>
                <h6>{playerDataObj.created_at}</h6>
                <h5>Position: {playerDataObj.positoin}</h5>
            </article>
        </Link>    
    )
}

PlayerCard.propType = {
    playerDataObj: PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        team_id: PropTypes.number.isRequired
    })
}
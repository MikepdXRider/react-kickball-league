import React from 'react'
import PropTypes from 'prop-types'

export default function PlayerCard({playerDataObj}) {
    return (
            <article>
                <h3>{playerDataObj.name}</h3>
                <h6>{playerDataObj.created_at}</h6>
                <h5>Position: {playerDataObj.positoin}</h5>
            </article>
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
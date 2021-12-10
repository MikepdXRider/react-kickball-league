import React from 'react'
import PropTypes from 'prop-types';
import changeTimeZone from '../../utils/change-timezone.js';


export default function TeamCard({teamDataObj}) {
    return (
            <article>
                <h3>{teamDataObj.name}</h3>
                <h6>Date Created: {changeTimeZone(teamDataObj.created_at)}</h6>
                <h5>{`${teamDataObj.city}, ${teamDataObj.state} `}</h5>
            </article>
    )
};

TeamCard.propTypes = {
    teamDataObj: PropTypes.shape({
        city: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(PropTypes.object)
    })
};
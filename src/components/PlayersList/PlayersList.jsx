import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../PlayerCard/PlayerCard.jsx';


export default function PlayersList({playersDataArr}) {
    return (
        <ul>
            {
                playersDataArr.map(playerDataObj => {
                    return (
                        <li key={playerDataObj.id}>
                            <PlayerCard playerDataObj={playerDataObj} />
                        </li>
                    )
                })
            }
        </ul>
    )
};

PlayersList.propTypes = {
    playersDataArr: PropTypes.arrayOf(PropTypes.object)
};
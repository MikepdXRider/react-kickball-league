import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../PlayerCard/PlayerCard.jsx';
import { Link } from 'react-router-dom';


export default function PlayersList({playersDataArr}) {
    return (
        <ul>
            {
                playersDataArr.map(playerDataObj => {
                    return (
                        <Link to={`/players/${playerDataObj.id}`}>
                            <li key={playerDataObj.id}>
                                <PlayerCard playerDataObj={playerDataObj} />
                            </li>
                        </Link>
                    )
                })
            }
        </ul>
    )
};

PlayersList.propTypes = {
    playersDataArr: PropTypes.arrayOf(PropTypes.object)
};
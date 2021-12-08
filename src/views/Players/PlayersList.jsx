import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import { getPlayers } from '../../services/players.jsx';

export default function PlayersList() {
    
    const [playersDataArr, setPlayersDataArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getPlayersData() {
            const newPlayersDataArr = await getPlayers();
            // console.log('getPlayers fn returns: ', newPlayersDataArr);
            setPlayersDataArr(newPlayersDataArr);
        }

        getPlayersData();
        setIsLoading(false);
    }, []);
   
    return (
        <main>
            {
                isLoading
                ? <h1>Loading...</h1> 
                : <section>
                    <ul>
                        {playersDataArr.map(playerDataObj => {
                            return (
                                <li key={playerDataObj.id}>
                                    <Link to={`/players/${playerDataObj.id}`}>
                                        <PlayerCard playerDataObj={playerDataObj}/>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            }
        </main>
    )
}

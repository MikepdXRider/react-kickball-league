import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import { getPlayers } from '../../services/players.js';

export default function PlayersList() {
    const history = useHistory();

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
            <button onClick={() => history.push('/players/add')}>Add Player</button>
            {
                isLoading
                ? <h1>Loading...</h1> 
                : <section>
                    {
                        playersDataArr[0] 
                        ? <article>
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
                        </article> 
                        : <h1>No Players data to display.</h1>
                    }
                </section>
            }
        </main>
    )
}

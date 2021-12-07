import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PlayersList from '../../components/PlayersList/PlayersList.jsx';
import { getPlayers } from '../../services/players.jsx';
import { getTeamById } from '../../services/teams.jsx';

export default function TeamDetails() {
    const { id } = useParams();

    // state
    const [teamDataObj, setTeamDataObj] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [playersDataArr, setPlayersDataArr] = useState([]);


    // useEffect did mount fetch 
    useEffect(() => {
        setIsLoading(true);
        async function getTeamData() {
            const newTeamDataObj = await getTeamById(id);
            console.log('getTeamById fn returns: ', newTeamDataObj);
            setTeamDataObj(newTeamDataObj);
        }
        
        async function getPlayersData() {
            const newPlayersDataArr = await getPlayers();
            console.log('getPlayers fn returns: ', newPlayersDataArr);
            setPlayersDataArr(newPlayersDataArr)
        }

        getPlayersData();
        getTeamData();
        setIsLoading(false);
    }, [id])
    
    return (
        <main>
            {
                isLoading 
                ? <h1>Loading...</h1> 
                : <>
                    <section>
                        <article style={{border: '1px solid black'}}>
                            <h3>{teamDataObj.name}</h3>
                            <h6>{teamDataObj.created_at}</h6>
                            <h5>{`${teamDataObj.city}, ${teamDataObj.state} `}</h5>
                        </article>
                    </section>
                    <section>
                        <PlayersList playersDataArr={playersDataArr} />
                    </section>
                </>
            }   
        </main>
    )
}

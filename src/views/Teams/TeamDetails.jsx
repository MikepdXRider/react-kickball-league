import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PlayersList from '../../components/PlayersList/PlayersList.jsx';
// import { getPlayers } from '../../services/players.jsx';
import { getTeamById } from '../../services/teams.jsx';

export default function TeamDetails() {
    const { id } = useParams();

    // state
    const [teamDataObj, setTeamDataObj] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    // const [playersDataArr, setPlayersDataArr] = useState([]);


    // useEffect did mount fetch 
    useEffect(() => {
        setIsLoading(true);
        async function getTeamData() {
            const newTeamDataObj = await getTeamById(id);
            console.log('getTeamById fn returns: ', newTeamDataObj);
            console.log(newTeamDataObj.players);
            setTeamDataObj(newTeamDataObj);
        }
        
        // async function getPlayersData() {
        //     const newPlayersDataArr = await getPlayers();
        //     console.log('getPlayers fn returns: ', newPlayersDataArr);
        //     const mungedPlayerDataArr = newPlayersDataArr.filter(playerDataObj => playerDataObj.team_id === id);
        //     console.log('mungedPlayedDataArr: ', mungedPlayerDataArr);
        //     setPlayersDataArr(newPlayersDataArr)
        // }

        // getPlayersData();
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
                        {
                            //❗ ODD BEHAVIOR ❗
                            // replacing teamDataObj.players with teamDataObj.players[0] breaks the site.
                            // error reads 'TypeError: Cannot read properties of undefined (reading '0')'
                            // If the page is already rendered and you switch out the if conditional, it begins behaving as expected(rending 'No players to display') UNTIL refresh-then every team details page is broken again.
                            // teamDataObj.players[0]
                            teamDataObj.players
                            ? <PlayersList playersDataArr={teamDataObj.players} />
                            : <h3>No players to display...</h3>
                        }
                    </section>
                </>
            }   
        </main>
    )
}

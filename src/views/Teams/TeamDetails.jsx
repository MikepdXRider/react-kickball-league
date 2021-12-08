import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PlayersList from '../../components/PlayersList/PlayersList.jsx';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import { getTeamById } from '../../services/teams.jsx';

export default function TeamDetails() {
    const { id } = useParams();

    const [teamDataObj, setTeamDataObj] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getTeamData() {
            const newTeamDataObj = await getTeamById(id);
            // console.log('getTeamById fn returns: ', newTeamDataObj);
            // console.log('playersArr :', newTeamDataObj.players);
            setTeamDataObj(newTeamDataObj);
            setIsLoading(false);
        }
        
        getTeamData();
    }, [id])
    
    return (
        <main>
            {
                // ✔ RESOLVED ODD BEHAVIOR ✔
                // THE SITE WAS NOT SHOWING 'Loading...'AT ANY POINT!
                isLoading 
                ? <h1>Loading...</h1> 
                : <>
                    <section>
                        <TeamCard teamDataObj={teamDataObj} />
                    </section>
                    <section>
                        {
                            // ✔ RESOLVED ODD BEHAVIOR ✔
                            // SOLVE: Initialize isLoading state as true, set to false at end of componentDidMount/useEffect. 
                            // https://dev.to/samba_code/nested-ternary-statements-in-react-jsx-35kp
                            // replacing teamDataObj.players with teamDataObj.players[0] and attempting to conditionally render an alternative text breaks the site 
                            // error reads 'TypeError: Cannot read properties of undefined (reading '0')'
                            // If the page is already rendered and you switch out the if conditional below it begins behaving as expected(rending 'No players to display') UNTIL refresh-then every team details page is broken again.
                            teamDataObj.players.length < 1 ? <h1>No player data to display</h1> : <PlayersList playersDataArr={teamDataObj.players} />
                        }
                    </section>
                </>
            }   
        </main>
    )
}

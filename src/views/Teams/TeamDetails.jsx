import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PlayersList from '../../components/PlayersList/PlayersList.jsx';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import { getTeamById } from '../../services/teams.jsx';

export default function TeamDetails() {
    const { id } = useParams();

    const [teamDataObj, setTeamDataObj] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getTeamData() {
            const newTeamDataObj = await getTeamById(id);
            console.log('getTeamById fn returns: ', newTeamDataObj);
            console.log(newTeamDataObj.players);
            setTeamDataObj(newTeamDataObj);
        }
        
        getTeamData();
        setIsLoading(false);
    }, [id])
    
    return (
        <main>
            {
                // ❗ ODD BEHAVIOR ❗
                // THE SITE IS NOT SHOWING 'Loading...'AT ANY POINT!
                isLoading 
                ? <h1>Loading...</h1> 
                : <>
                    <section>
                        <TeamCard teamDataObj={teamDataObj} />
                    </section>
                    <section>
                        {
                            //❗ ODD BEHAVIOR ❗
                            // https://dev.to/samba_code/nested-ternary-statements-in-react-jsx-35kp
                            // replacing teamDataObj.players with teamDataObj.players[0] and attemtping to conditionally render an alternative text breaks the site 
                            // error reads 'TypeError: Cannot read properties of undefined (reading '0')'
                            // If the page is already rendered and you switch out the if conditional below it begins behaving as expected(rending 'No players to display') UNTIL refresh-then every team details page is broken again.
                            // teamDataObj.players[0] ? <PlayersList playersDataArr={teamDataObj.players} /> : <h1>No player data to display</h1>
                            teamDataObj.players && <PlayersList playersDataArr={teamDataObj.players} />
                        }
                    </section>
                </>
            }   
        </main>
    )
}

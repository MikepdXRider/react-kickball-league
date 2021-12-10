import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import PlayersList from '../../components/PlayersList/PlayersList.jsx';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import TeamForm from '../../components/TeamForm/TeamForm.jsx';
import { deleteTeamById, getTeamById, updateTeamById } from '../../services/teams.js';

export default function TeamDetails() {
    const { id } = useParams();

    const history = useHistory();

    const [teamNameStr, setTeamNameStr] = useState('');
    const [teamCityStr, setTeamCityStr] = useState('');
    const [teamStateStr, setTeamStateStr] = useState('');
    const [teamDataObj, setTeamDataObj] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [editSwitch, setEditSwitch] = useState(false);


    // ❓ Is there a better way to approach this?
    async function fetchTeamData(id) {
        setIsLoading(true);
        const newTeamDataObj = await getTeamById(id);
        setTeamDataObj(newTeamDataObj);
        setTeamNameStr(newTeamDataObj.name);
        setTeamCityStr(newTeamDataObj.city);
        setTeamStateStr(newTeamDataObj.state);
        setIsLoading(false);
    }
    

    // ❓ Is there a better way to approach this? I had to add the id as a param to fetchTeamData fn and then pass it as a dependency. If I feed it the fetchTeamData fn as a dependency, it creates an infinite loop. If I remove the array, it creates an infinite loop.
    useEffect(() => {
        async function componentDidMount() {
            await fetchTeamData(id);
        }
        componentDidMount();
    }, [id])


    async function handleSubmit(e) {
        e.preventDefault();
        await updateTeamById(id, {name: teamNameStr, city: teamCityStr, state: teamStateStr});
        await fetchTeamData(id);
        setEditSwitch(prevState => !prevState);
    }


    async function deleteTeam(){
        // eslint-disable-next-line no-restricted-globals
        const isExecuted = confirm(`Are you sure you want to delete ${teamNameStr}? This can be permanent`);

        if (isExecuted) {
            try{
                await deleteTeamById(id);
                return history.push('/teams');
            } catch(err) {
                if (err.code === '23503') {
                    alert('You cannot delete a team with registered players. Please delete players or move them to a new team first.');
                }
            }
        } else {
            return;
        }
    }

    // 🌟 Potential alternative the isLoading ternary. 
    // if (isLoading) return <h1>Loading...</h1>

    return (
        <main>
            {
                // ✔ RESOLVED ODD BEHAVIOR ✔
                // THE SITE WAS NOT SHOWING 'Loading...'AT ANY POINT!
                // SOLVE: Initialize isLoading state as true, set to false at end of componentDidMount/useEffect.
                isLoading 
                ? <h1>Loading...</h1> 
                : <>
                    <section>
                        {
                            !editSwitch 
                            ? <article style={{border: '1px solid black'}}>
                                <TeamCard teamDataObj={teamDataObj} />
                                <button onClick={() => setEditSwitch(prevState => !prevState)}>Edit Team</button>
                                <button onClick={async () => await deleteTeam()}>Delete Team</button>
                            </article>
                            : <TeamForm 
                                edit={true}
                                submitFn={handleSubmit}
                                teamNameStr={teamNameStr}
                                teamCityStr={teamCityStr}
                                teamStateStr={teamStateStr}
                                setTeamNameStr={setTeamNameStr}
                                setTeamCityStr={setTeamCityStr}
                                setTeamStateStr={setTeamStateStr}
                            />
                        }
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

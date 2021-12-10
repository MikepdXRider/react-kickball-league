import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import { getTeams } from '../../services/teams.js';



export default function TeamsList() {
    const history = useHistory();
    
    // establish state hooks
    const [teamsDataArr, setTeamsDataArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // use useEffect hooks to manage API requests.
    useEffect(() => {
        async function getTeamsData(){
            const newTeamsDataArr = await getTeams();
            // console.log('getTeams fn returns :', newTeamsDataArr);
            setTeamsDataArr(newTeamsDataArr);
            setIsLoading(false);
        }

        getTeamsData();
    }, [])

    // 🌟 Potential alternative the isLoading ternary. 
    // if (isLoading) return <h1>Loading...</h1>

    return (
        <main>
            {
                isLoading
                ? <h1>Loading...</h1> 
                : <section>
                    <button onClick={() => history.push('teams/add')}>Add team</button>
                    <ul>
                        {teamsDataArr.map(teamDataObj => {
                            return (
                                <li key={teamDataObj.id}>
                                    <Link to={`/teams/${teamDataObj.id}`}>
                                        <TeamCard teamDataObj={teamDataObj}/>
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

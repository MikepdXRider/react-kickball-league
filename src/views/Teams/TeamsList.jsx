import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import { getTeams } from '../../services/teams.jsx';

export default function TeamsList() {
    // establish state hooks
    const [teamsDataArr, setTeamsDataArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // use useEffect hooks to manage API requests.
    useEffect(() => {
        async function getTeamsData(){
            const newTeamsDataArr = await getTeams();
            console.log('getTeams fn returns :', newTeamsDataArr);
            setTeamsDataArr(newTeamsDataArr);
            setIsLoading(false);
        }

        getTeamsData();
    }, [])

    return (
        <main>
            {
                isLoading
                ? <h1>Loading...</h1> 
                : <section>
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

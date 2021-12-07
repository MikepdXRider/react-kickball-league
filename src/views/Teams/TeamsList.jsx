import React, { useEffect, useState } from 'react'
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import { getTeams } from '../../services/teams.jsx';

export default function TeamsList() {
    // establish state hooks
    const [teamsDataArr, setTeamsDataArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // use useEffect hooks to manage API requests.
    useEffect(() => {
        setIsLoading(true);
        async function getTeamsData(){
            const newTeamsDataArr = await getTeams();
            console.log('getTeams fn returns :', newTeamsDataArr);
            setTeamsDataArr(newTeamsDataArr);
        }

        getTeamsData();
        setIsLoading(false);
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
                                    <TeamCard teamDataObj={teamDataObj}/>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            }
        </main>
    )
}

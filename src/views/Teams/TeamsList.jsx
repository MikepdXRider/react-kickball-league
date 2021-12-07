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
            const teamsDataArr = await getTeams();
            console.log(teamsDataArr);
            setTeamsDataArr(teamsDataArr);
        }

        getTeamsData();
        setIsLoading(false);
    }, [])

    return (
        <section>
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
        </section>
    )
}

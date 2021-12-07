import React, { useEffect, useState } from 'react'
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
                        {teamsDataArr.map(teamsDataObj => {
                            return <li>
                                {/* TeamCard here */}
                            </li>
                        })}
                    </ul>
                </section>
            }
                {/* - Wrap each team in a link that directs the user to `/team${team.id}` */}
        </section>
    )
}

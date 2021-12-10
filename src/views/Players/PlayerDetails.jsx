import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import PlayerForm from '../../components/PlayerForm/PlayerForm.jsx';
import { getPlayerById, updatePlayerById } from '../../services/players.js';

export default function PlayerDetails() {
    const { id } = useParams();

    // for delete functionality.
    // const history = useHistory();

    const [playerNameStr, setPlayerNameStr] = useState('');
    const [playerPositionStr, setPlayerPositionStr] = useState('');
    // could be used in addplayer views.
    // const [playerTeamIdNum, setPlayerTeamIdNum] = useState(0);
    const [playerDataObj, setPlayerDataObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editSwitch, setEditSwitch] = useState(false);


    // ❓ Is there a better way to approach this?
    async function fetchPlayerData(id) {
        setIsLoading(true);
        const newPlayerDataObj = await getPlayerById(id);
        setPlayerDataObj(newPlayerDataObj);
        setPlayerNameStr(newPlayerDataObj.name);
        setPlayerPositionStr(newPlayerDataObj.position)
        setIsLoading(false);
    }


    // ❓ Is there a better way to approach this? I had to add the id as a param to fetchTeamData fn and then pass it as a dependency. If I feed it the fetchTeamData fn as a dependency, it creates an infinite loop. If I remove the array, it creates an infinite loop.
    useEffect(()=> {
        async function componentDidMount() {
            await fetchPlayerData(id);
        }
        componentDidMount();
    }, [id])


    async function handleSubmit(e) {
        e.preventDefault();
        await updatePlayerById(id, {name: playerNameStr, position: playerPositionStr});
        await fetchPlayerData(id);
        setEditSwitch(prevState => !prevState);
    }

    // 🌟 Potential alternative the isLoading ternary. 
    // if (isLoading) return <h1>Loading...</h1>

    return (
        <main>
            {
                isLoading
                ? <h1>Loading...</h1>
                : <section>
                    {
                        !editSwitch
                        ? <article>
                            <PlayerCard playerDataObj={playerDataObj} />
                            <button onClick={() => setEditSwitch(prevState => !prevState)}>Edit Player</button>
                        </article>
                        : <PlayerForm 
                            edit={true}
                            submitFn={handleSubmit}
                            playerNameStr={playerNameStr}
                            playerPositionStr={playerPositionStr}
                            setPlayerNameStr={setPlayerNameStr}
                            setPlayerPositionStr={setPlayerPositionStr}
                        />
                    }   
                </section>
            }
        </main>
    )
}

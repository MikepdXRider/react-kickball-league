import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import PlayerForm from '../../components/PlayerForm/PlayerForm.jsx';
import { deletePlayerById, getPlayerById, updatePlayerById } from '../../services/players.js';

export default function PlayerDetails() {
    const { id } = useParams();

    const history = useHistory();

    const [playerNameStr, setPlayerNameStr] = useState('');
    const [playerPositionStr, setPlayerPositionStr] = useState('');
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

    async function deletePlayer(){
        // eslint-disable-next-line no-restricted-globals
        const isExecuted = confirm(`Are you sure you want to delete ${playerNameStr}? This can be permanent.`);

        if (isExecuted) {
            try{
                await deletePlayerById(id);
                return history.push('/teams');
            } catch(err) {
                console.log(err);
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
                isLoading
                ? <h1>Loading...</h1>
                : <section>
                    {
                        !editSwitch
                        ? <article>
                            <PlayerCard playerDataObj={playerDataObj} />
                            <button onClick={() => setEditSwitch(prevState => !prevState)}>Edit Player</button>
                            <button onClick={() => deletePlayer()}>Delete Player</button>
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

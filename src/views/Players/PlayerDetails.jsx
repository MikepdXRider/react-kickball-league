import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import { getPlayerById } from '../../services/players.js';

export default function PlayerDetails() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [playerDataObj, setPlayerDataObj] = useState({});


    useEffect(()=> {
        async function getPlayerData() {
            const newPlayerDataObj = await getPlayerById(id);
            setPlayerDataObj(newPlayerDataObj);
            setIsLoading(false);
        }

        getPlayerData();
    }, [id])


    return (
        <main>
            {
                isLoading
                ? <h1>Loading...</h1>
                : <PlayerCard playerDataObj={playerDataObj} />
            }
        </main>
    )
}

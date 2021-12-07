import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react/cjs/react.development';
import PlayerCard from '../../components/PlayerCard/PlayerCard.jsx';
import { getPlayerById } from '../../services/players.jsx';

export default function PlayerDetails() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [playerDataObj, setPlayerDataObj] = useState({});


    useEffect(()=> {
        setIsLoading(true);
        async function getPlayerData() {
            const newPlayerDataObj = await getPlayerById(id);
            console.log(newPlayerDataObj);
            setPlayerDataObj(newPlayerDataObj);
        }

        getPlayerData();
        setIsLoading(false);
    }, [])


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

import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development';

export default function PlayersList() {
    
    const [playersDataArr, setPlayersDataArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getPlayersData() {
            const newPlayersDataArr = await getPlayers();
            console.log('getPlayers fn returns: ', newPlayersDataArr);
            const mungedPlayerDataArr = newPlayersDataArr.filter(playerDataObj => playerDataObj.team_id === id);
            console.log('mungedPlayedDataArr: ', mungedPlayerDataArr);
            setPlayersDataArr(newPlayersDataArr)
        }

        getPlayersData();
    }, [])
   
    return (
        
    )
}

import React from 'react'
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development'
import PlayerForm from '../../components/PlayerForm/PlayerForm.jsx';
import { createPlayer } from '../../services/players.js';
import { getTeams } from '../../services/teams.js';

export default function AddPlayer() {
    const history = useHistory();

    const [playerNameStr, setPlayerNameStr] = useState('');
    const [playerPositionStr, setPlayerPositionStr] = useState('');
    const [playerTeamIdNum, setPlayerTeamIdNum] = useState(0);
    const [teamDataArr, setTeamDataArr] = useState([]);


    useEffect(() => {
        async function componentDidMount() {
            const newTeamDataArr = await getTeams();
            console.log(newTeamDataArr);
            setTeamDataArr(newTeamDataArr);
        }
        componentDidMount();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // 🟢 Get this working! When the user has not selected a valid team, do not make the createPlayer request.
        // if (playerTeamIdNum === '0'){
        //     prompt('Please assign player to a team.');
        //     return;
        // }
        const response = await createPlayer({name: playerNameStr, position: playerPositionStr,  teamId: playerTeamIdNum});
        history.push(`/players/${response[0].id}`);
    }

    return (
        <PlayerForm
            submitFn={handleSubmit}
            teamDataArr={teamDataArr}
            playerNameStr={playerNameStr}
            playerPositionStr={playerPositionStr}
            playerTeamIdNum={playerTeamIdNum}
            setPlayerNameStr={setPlayerNameStr}
            setPlayerPositionStr={setPlayerPositionStr}
            setPlayerTeamIdNum={setPlayerTeamIdNum}
        />
    )
}
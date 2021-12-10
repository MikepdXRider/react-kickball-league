import React from 'react'
import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development'
import TeamForm from '../../components/TeamForm/TeamForm.jsx'
import { createTeam } from '../../services/teams.js';

export default function AddTeam() {
    const history = useHistory();

    const [teamNameStr, setTeamNameStr] = useState('');
    const [teamCityStr, setTeamCityStr] = useState('');
    const [teamStateStr, setTeamStateStr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createTeam({name: teamNameStr, city: teamCityStr,  state: teamStateStr});
        history.push(`/teams/${response[0].id}`);
    }

    return (
        <TeamForm 
            submitFn={handleSubmit}
            teamNameStr={teamNameStr}
            teamCityStr={teamCityStr}
            teamStateStr={teamStateStr}
            setTeamNameStr={setTeamNameStr}
            setTeamCityStr={setTeamCityStr}
            setTeamStateStr={setTeamStateStr}
        />
    )
}

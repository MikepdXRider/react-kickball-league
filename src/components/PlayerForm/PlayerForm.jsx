import React from 'react'

export default function PlayerForm({edit = false, playerNameStr, setPlayerNameStr, playerPositionStr, setPlayerPositionStr, submitFn, teamsDataArr, playerTeamStr, setPlayerTeam}) {
    return (
        <form onSubmit={(e) => submitFn(e)}>
            <fieldset>
                <legend>{edit ? 'Edit Player' : 'Add Player'}</legend>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" value={playerNameStr} onChange={(e) => setPlayerNameStr(e.target.value)} name="Player-name"/>

                <label htmlFor="position">Position: </label>
                <input type="text" id="position" value={playerPositionStr} onChange={(e) => setPlayerPositionStr(e.target.value)} name='Player-city'/>

                {
                    teamsDataArr 
                    && <>
                     <label htmlFor="team">Team: </label>
                    <select value={playerTeamStr} onChange={setPlayerTeam} name="teams" id="team">
                    <option value="" selected disabled>-</option>
                    {teamsDataArr.map(teamsDataObj => <option name={teamsDataObj.name} value={teamsDataObj.id}>{teamsDataObj.name}</option>)}
                    </select>
                    </>
                }

                <input type="submit" />
            </fieldset>
        </form>
    )
}

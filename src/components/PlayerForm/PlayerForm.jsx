import React from 'react'

export default function PlayerForm({edit = false, playerNameStr, setPlayerNameStr, playerPositionStr, setPlayerPositionStr, submitFn, teamDataArr, playerTeamIdNum, setPlayerTeamIdNum}) {
    return (
        <form onSubmit={(e) => submitFn(e)}>
            <fieldset>
                <legend>{edit ? 'Edit Player' : 'Add Player'}</legend>

                <label htmlFor="name">Name: </label>
                <input type="text" id="name" value={playerNameStr} onChange={(e) => setPlayerNameStr(e.target.value)} name="Player-name" required/>

                <label htmlFor="position">Position: </label>
                <input type="text" id="position" value={playerPositionStr} onChange={(e) => setPlayerPositionStr(e.target.value)} name='Player-city' required/>

                {
                    teamDataArr 
                    && <>
                        <label htmlFor="team">Team: </label>
                        <select value={playerTeamIdNum} onChange={(e) => setPlayerTeamIdNum(e.target.value)} name="teams" id="team" required>
                        <option value=''>-</option>
                        {teamDataArr.map(teamsDataObj => <option key={teamsDataObj.id} name={teamsDataObj.name} value={teamsDataObj.id}>{teamsDataObj.name}</option>)}
                        </select>
                    </>
                }

                <input type="submit" />
            </fieldset>
        </form>
    )
}

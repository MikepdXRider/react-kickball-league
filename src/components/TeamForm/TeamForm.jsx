import React from 'react'

export default function TeamForm({edit = false, teamNameStr, setTeamNameStr, teamCityStr, setTeamCityStr, teamStateStr, setTeamStateStr, submitFn}) {
    return (
        <form onSubmit={(e) => submitFn(e)}>
            <fieldset>
                <legend>{edit ? 'Edit Team' : 'Add New Team'}</legend>

                <label htmlFor="name">Name: </label>
                <input type="text" id="name" value={teamNameStr} onChange={(e) => setTeamNameStr(e.target.value)} name="team-name" required/>

                <label htmlFor="city">City: </label>
                <input type="text" id="city" value={teamCityStr} onChange={(e) => setTeamCityStr(e.target.value)} name='team-city' required/>

                <label htmlFor="state">State: </label>
                <input type="text" id="state" value={teamStateStr} onChange={(e) => setTeamStateStr(e.target.value)} name='team-state' required/>

                {/* <input type="submit" /> */}
                <button name='Add Team'>Add Team</button>
            </fieldset>
        </form>
    )
}

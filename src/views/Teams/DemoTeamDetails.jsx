import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeamById } from '../../services/teams';

function TeamDetail({ label, match }) {
  const { teamId } = match.params;
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamById(teamId)
      .then((resp) => setTeam(resp))
      .finally(() => setLoading(false));
  }, [teamId]);

  if (loading) return <h1>Loading team...</h1>;

  return (
    <>
      <h4>{label}</h4>
      <p>
        <Link to='/teams' className='App-link'>
          Back to Teams
        </Link>
      </p>
      <h1>{team.name}</h1>
      <p>
        From {team.city}, {team.state}
      </p>
      <ul>
        {team.players.map((player) => {
          return (
            <li key={player.id}>
              {player.position} - {player.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TeamDetail;
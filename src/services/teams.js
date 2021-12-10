import { client, parseData } from './client';

export async function getTeams() {
  const request = await client.from('teams').select().order('name');
  return parseData(request);
}

export async function getTeamById(id) {
  const request = await client
    .from('teams')
    .select('*, players (*)')
    .match({ id })
    .single();
  return parseData(request);
}

export async function updateTeamById(id, { name, city, state }) {
  const request = await client
    .from('teams')
    .update({ name, city, state })
    .match({ id });
  return parseData(request);
}

export async function createTeam({ name, city, state }) {
  const request = await client.from('teams').insert({ name, city, state });
  return parseData(request);
}

export async function deleteTeamById(id) {
  const request = await client.from('teams').delete().match({ id });
  return parseData(request);
}

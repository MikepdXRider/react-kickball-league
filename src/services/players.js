import { client, parseData } from './client';

export async function getPlayers() {
  const request = await client.from('players').select().order('name');
  return parseData(request);
}

export async function getPlayerById(id) {
  const request = await client
    .from('players')
    .select('*, teams (*)')
    .match({ id })
    .single();
  return parseData(request);
}

export async function updatePlayerById(id, { name, position }) {
  const request = await client
    .from('players')
    .update({ name, position })
    .match({ id });
  return parseData(request);
}

export async function createPlayer({ name, position, teamId }) {
  const request = await client
    .from('players')
    .insert([{ name, position, team_id: teamId }]);
  return parseData(request);
}

export async function deletePlayerById(id) {
  const request = await client.from('players').delete().match({ id });
  return parseData(request);
}
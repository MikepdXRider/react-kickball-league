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
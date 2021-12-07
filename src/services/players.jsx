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
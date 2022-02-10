import config from "../../config";
import { Player } from "./player";
import { RoomConfig } from "./roomConfig";

export function joinRoom(player: Player, roomNumber?: number, roomId?: string) {
  return sendRequest('POST', 'rooms/join', {player: player, id: roomId, number: roomNumber});
}

export function createRoom(creator: Player, config: RoomConfig) {
  return sendRequest('POST', 'rooms/new', {creator: creator, config: config});
}

function sendRequest(method: 'GET' | 'POST' | 'DELETE', endpoint: string, request: object) {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': config.apiKey },
    body: JSON.stringify(request)
  };
    
  return fetch(config.apiHost + endpoint, requestOptions).then(response => response.json());
}

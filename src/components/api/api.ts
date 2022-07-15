import config from "../../config";
import { Player } from "./player";
import { RoomConfig } from "./roomConfig";

export function leaveRoom(player: Player, roomId?: string, roomNumber?: number) {
  return sendRequest('POST', 'rooms/leave', {player: player, id: roomId, number: roomNumber});
}

export function joinRoom(player: Player, roomId?: string, roomNumber?: number) {
  return sendRequest('POST', 'rooms/join', {player: player, id: roomId, number: roomNumber});
}

export function createRoom(config: RoomConfig) {
  return sendRequest('POST', 'rooms/new', {config: config});
}

function sendRequest(method: 'GET' | 'POST' | 'DELETE', endpoint: string, request: object) {
  console.log(endpoint);
  console.log(request);
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': config.apiKey },
    body: JSON.stringify(request)
  };
    
  return fetch(config.apiHost + endpoint, requestOptions).then(response => response.json());
}

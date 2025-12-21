import { serverClient } from "@/app/lib/sanity.server";
import { worldCupPlayersQuery } from "./worldCupPlayersQuery";

export async function getWorldCupPlayers() {
  return serverClient.fetch(worldCupPlayersQuery);
}

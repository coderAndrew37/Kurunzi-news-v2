export const worldCupPlayersQuery = `*[_type == "worldcupPlayer"]{
  _id,
  name,
  position,
  age,
  club,
  bio,
  achievements,
  "flag": flag,
  "team": team->name,
  stats,
  image
}`;

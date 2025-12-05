export const teamsQuery = `*[_type == "team"] | order(fifaRanking asc) {
  _id,
  name,
  code,
  flag,
  group,
  fifaRanking,
  previousBest
}`;

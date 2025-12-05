export const worldCupMatchQuery = `*[_type == "worldcupmatch"]{
  "id": _id,
  date,
  time,
  venue,
  competition,
  stage,
  score,
  status,
  homeTeam->{
    name,
    code,
    flag
  },
  awayTeam->{
    name,
    code,
    flag
  },
gallery[]->{
  _id,
  image,            
  caption,
  type,
  photographer,
  takenAt,
  likes
}

}
`;

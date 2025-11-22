import { groq } from "next-sanity";
import WorldCupClientPage from "./WorldcupClientPage";
import { serverClient } from "../lib/sanity.server";

// Revalidate every 5 minutes
export const revalidate = 300;

const worldCupQuery = groq`
  *[_type == "worldCupArticle" && defined(publishedAt)] | order(publishedAt desc)[0...20] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "category": category->title,
    "author": author->{name, slug},
    "image": mainImage.asset->url,
    readTime,
    isBreaking,
    isFeatured
  }
`;

const standingsQuery = groq`
  *[_type == "worldCupGroup"] | order(name asc) {
    _id,
    name,
    "teams": teams[]->{
      _id,
      name,
      code,
      "flag": flag.asset->url,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      points
    } | order(points desc, (goalsFor - goalsAgainst) desc, goalsFor desc)
  }
`;

const fixturesQuery = groq`
  *[_type == "worldCupMatch" && defined(matchDate)] | order(matchDate asc)[0...10] {
    _id,
    matchDate,
    "homeTeam": homeTeam->{name, code, "flag": flag.asset->url},
    "awayTeam": awayTeam->{name, code, "flag": flag.asset->url},
    venue,
    "group": group->name,
    homeScore,
    awayScore,
    status,
    matchType
  }
`;

export default async function WorldCupPage() {
  const [articles, standings, fixtures] = await Promise.all([
    serverClient.fetch(worldCupQuery),
    serverClient.fetch(standingsQuery),
    serverClient.fetch(fixturesQuery),
  ]);

  return (
    <WorldCupClientPage
      articles={articles}
      standings={standings}
      fixtures={fixtures}
    />
  );
}

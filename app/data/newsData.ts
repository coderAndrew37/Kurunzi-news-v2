export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  gallery: string[];
  relatedArticles: string[];
  matchDetails?: {
    teams: string[];
    date: string;
    venue: string;
    competition: string;
  };
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "host-cities-announced-world-cup-2026",
    title:
      "FIFA Announces Final Host Cities for World Cup 2026 Across North America",
    excerpt:
      "The complete list of 16 host cities has been revealed, spanning the United States, Canada, and Mexico for the historic 48-team tournament.",
    content: `
      <p>In a landmark announcement today, FIFA has confirmed the 16 host cities that will welcome the world for the 2026 FIFA World Cup. The expanded 48-team tournament will be spread across North America, with matches taking place in cities from Vancouver to Mexico City.</p>

      <h2>United States Host Cities</h2>
      <p>The United States will host the majority of matches, with 11 cities selected:</p>
      <ul>
        <li>Atlanta, Georgia - Mercedes-Benz Stadium</li>
        <li>Boston, Massachusetts - Gillette Stadium</li>
        <li>Dallas, Texas - AT&T Stadium</li>
        <li>Houston, Texas - NRG Stadium</li>
        <li>Kansas City, Missouri - Arrowhead Stadium</li>
        <li>Los Angeles, California - SoFi Stadium</li>
        <li>Miami, Florida - Hard Rock Stadium</li>
        <li>New York/New Jersey - MetLife Stadium</li>
        <li>Philadelphia, Pennsylvania - Lincoln Financial Field</li>
        <li>San Francisco Bay Area - Levi's Stadium</li>
        <li>Seattle, Washington - Lumen Field</li>
      </ul>

      <h2>Canadian Host Cities</h2>
      <p>Canada will host matches in two cities:</p>
      <ul>
        <li>Toronto, Ontario - BMO Field</li>
        <li>Vancouver, British Columbia - BC Place</li>
      </ul>

      <h2>Mexican Host Cities</h2>
      <p>Mexico returns as World Cup host with three cities:</p>
      <ul>
        <li>Guadalajara - Estadio Akron</li>
        <li>Mexico City - Estadio Azteca</li>
        <li>Monterrey - Estadio BBVA</li>
      </ul>

      <p>The selection process considered factors including stadium capacity, infrastructure, transportation, and fan experience. Estadio Azteca in Mexico City will make history by becoming the first stadium to host World Cup matches in three different tournaments.</p>

      <blockquote>
        "This is a monumental moment for football in North America. The 2026 World Cup will be a celebration of the game across three nations, bringing people together through the power of football."
        <footer>- FIFA President</footer>
      </blockquote>

      <p>Tournament organizers have also announced that the opening match will be held at Estadio Azteca in Mexico City, while the final will take place at MetLife Stadium in New York/New Jersey.</p>
    `,
    featuredImage: "/images/host-cities-announcement.jpg",
    author: {
      name: "James Rodriguez",
      role: "Senior Football Correspondent",
      avatar: "/images/authors/james-rodriguez.jpg",
      bio: "James has been covering international football for over 15 years, reporting from six World Cups and numerous international tournaments.",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    category: "Official News",
    tags: ["Host Cities", "Stadiums", "North America", "Tournament"],
    readTime: 4,
    gallery: [
      "/images/gallery/stadium-1.jpg",
      "/images/gallery/stadium-2.jpg",
      "/images/gallery/stadium-3.jpg",
      "/images/gallery/stadium-4.jpg",
    ],
    relatedArticles: ["2", "3"],
  },
  {
    id: "2",
    slug: "qualification-process-begins-2026",
    title:
      "World Cup 2026 Qualification Process Officially Begins with 211 Nations",
    excerpt:
      "The road to North America starts now as national teams begin their journey to secure one of 48 spots in the expanded tournament format.",
    content: "Full article content...",
    featuredImage: "/images/qualification-begins.jpg",
    author: {
      name: "Sarah Johnson",
      role: "International Football Analyst",
      avatar: "/images/authors/sarah-johnson.jpg",
      bio: "Sarah specializes in international competitions and has been analyzing World Cup qualifiers for over a decade.",
    },
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    category: "Qualifiers",
    tags: ["Qualification", "National Teams", "Road to 2026"],
    readTime: 6,
    gallery: [],
    relatedArticles: ["1", "3"],
  },
];

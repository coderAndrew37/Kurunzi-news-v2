interface GalleryImage {
  _id: string;
  url: string;
  caption: string;
  type: "goal" | "celebration" | "fan" | "stadium" | "tactical";
  photographer: string;
  takenAt: string;
  likes: number;
}

// data/sampleMatches.ts
interface Match {
  _id: string;
  homeTeam: {
    name: string;
    code: string;
    flag?: string;
  };
  awayTeam: {
    name: string;
    code: string;
    flag?: string;
  };
  date: string;
  time: string;
  venue: string;
  competition: string;
  stage: string;
  score: {
    home: number;
    away: number;
  };
  status: "scheduled" | "live" | "finished";
  gallery: GalleryImage[];
}
export const sampleMatches: Match[] = [
  {
    _id: "1",
    homeTeam: {
      name: "Argentina",
      code: "ARG",
      flag: "🇦🇷",
    },
    awayTeam: {
      name: "Brazil",
      code: "BRA",
      flag: "🇧🇷",
    },
    date: "2024-07-15",
    time: "20:00",
    venue: "MetLife Stadium, New York",
    competition: "World Cup 2026",
    stage: "Final",
    score: { home: 3, away: 2 },
    status: "finished",
    gallery: [
      {
        _id: "img1",
        url: "/match-arg-bra-1.jpg",
        caption:
          "Lionel Messi lifts the World Cup trophy after Argentina victory",
        type: "celebration",
        photographer: "James Rodriguez",
        takenAt: "2024-07-15T22:30:00Z",
        likes: 12500,
      },
      {
        _id: "img2",
        url: "/match-arg-bra-2.jpg",
        caption: "Messi scores the winning goal in extra time",
        type: "goal",
        photographer: "Maria Santos",
        takenAt: "2024-07-15T21:45:00Z",
        likes: 18900,
      },
      {
        _id: "img3",
        url: "/match-arg-bra-3.jpg",
        caption: "Brazilian fans show support despite loss",
        type: "fan",
        photographer: "Carlos Mendez",
        takenAt: "2024-07-15T20:15:00Z",
        likes: 8400,
      },
      {
        _id: "img4",
        url: "/match-arg-bra-4.jpg",
        caption: "Stadium packed with 82,500 fans",
        type: "stadium",
        photographer: "Lisa Wang",
        takenAt: "2024-07-15T19:30:00Z",
        likes: 9200,
      },
      {
        _id: "img5",
        url: "/match-arg-bra-5.jpg",
        caption: "Argentina tactical formation in first half",
        type: "tactical",
        photographer: "David Chen",
        takenAt: "2024-07-15T20:00:00Z",
        likes: 7600,
      },
      {
        _id: "img6",
        url: "/match-arg-bra-6.jpg",
        caption: "Neymar equalizer from free kick",
        type: "goal",
        photographer: "Emma Wilson",
        takenAt: "2024-07-15T21:20:00Z",
        likes: 15400,
      },
    ],
  },
  {
    _id: "2",
    homeTeam: {
      name: "France",
      code: "FRA",
      flag: "🇫🇷",
    },
    awayTeam: {
      name: "England",
      code: "ENG",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    },
    date: "2024-07-10",
    time: "17:00",
    venue: "AT&T Stadium, Dallas",
    competition: "World Cup 2026",
    stage: "Semi-Final",
    score: { home: 2, away: 1 },
    status: "finished",
    gallery: [
      {
        _id: "img7",
        url: "/match-fra-eng-1.jpg",
        caption: "Mbappé scores brilliant solo goal",
        type: "goal",
        photographer: "James Rodriguez",
        takenAt: "2024-07-10T18:30:00Z",
        likes: 11200,
      },
      {
        _id: "img8",
        url: "/match-fra-eng-2.jpg",
        caption: "England fans creating incredible atmosphere",
        type: "fan",
        photographer: "Sarah Johnson",
        takenAt: "2024-07-10T17:45:00Z",
        likes: 7800,
      },
    ],
  },
  {
    _id: "3",
    homeTeam: {
      name: "Spain",
      code: "ESP",
      flag: "🇪🇸",
    },
    awayTeam: {
      name: "Germany",
      code: "GER",
      flag: "🇩🇪",
    },
    date: "2024-07-08",
    time: "14:30",
    venue: "SoFi Stadium, Los Angeles",
    competition: "World Cup 2026",
    stage: "Quarter-Final",
    score: { home: 3, away: 2 },
    status: "finished",
    gallery: [
      {
        _id: "img9",
        url: "/match-esp-ger-1.jpg",
        caption: "Spanish players celebrate last-minute winner",
        type: "celebration",
        photographer: "Carlos Mendez",
        takenAt: "2024-07-08T16:15:00Z",
        likes: 9800,
      },
    ],
  },
];

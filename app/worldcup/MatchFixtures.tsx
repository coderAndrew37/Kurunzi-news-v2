// components/MatchFixtures.tsx
import Link from "next/link";

interface Match {
  _id: string;
  homeTeam: {
    name: string;
    code: string;
    flag: string;
  };
  awayTeam: {
    name: string;
    code: string;
    flag: string;
  };
  date: string;
  time: string;
  venue: string;
  stage: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
}

interface MatchFixturesProps {
  matches: Match[];
  title?: string;
}

export default function MatchFixtures({
  matches,
  title = "Upcoming Matches",
}: MatchFixturesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-600 text-white";
      case "finished":
        return "bg-green-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE";
      case "finished":
        return "FT";
      default:
        return "UPCOMING";
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">{title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
          </div>
          <Link
            href="/worldcup/fixtures"
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/20"
          >
            Full Schedule
          </Link>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div
              key={match._id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group"
            >
              {/* Match Status */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(match.status)}`}
                >
                  {getStatusText(match.status)}
                </span>
                <span className="text-sm text-gray-300">{match.stage}</span>
              </div>

              {/* Teams */}
              <div className="space-y-4">
                {/* Home Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">
                        {match.homeTeam.code}
                      </span>
                    </div>
                    <span className="font-semibold">{match.homeTeam.name}</span>
                  </div>
                  {match.homeScore !== undefined && (
                    <span className="text-2xl font-black">
                      {match.homeScore}
                    </span>
                  )}
                </div>

                {/* VS Separator */}
                <div className="text-center text-gray-400 text-sm font-bold">
                  VS
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">
                        {match.awayTeam.code}
                      </span>
                    </div>
                    <span className="font-semibold">{match.awayTeam.name}</span>
                  </div>
                  {match.awayScore !== undefined && (
                    <span className="text-2xl font-black">
                      {match.awayScore}
                    </span>
                  )}
                </div>
              </div>

              {/* Match Details */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{new Date(match.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>{match.time}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300 flex items-center gap-2">
                  <span>🏟️</span>
                  <span className="truncate">{match.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

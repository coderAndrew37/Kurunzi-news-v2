import Image from "next/image";
import { Clock, MapPin } from "lucide-react";

interface FixturesListProps {
  fixtures: Match[];
}

export default function FixturesList({ fixtures }: FixturesListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMatchStatus = (match: Match) => {
    if (match.status === "live") {
      return (
        <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
      );
    }
    return null;
  };

  const groupFixturesByDate = (fixtures: Match[]) => {
    const groups: { [key: string]: Match[] } = {};

    fixtures.forEach((match) => {
      const date = new Date(match.matchDate).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(match);
    });

    return groups;
  };

  const groupedFixtures = groupFixturesByDate(fixtures);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Fixtures & Results</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {Object.entries(groupedFixtures).map(([date, matches]) => (
          <div key={date}>
            <div className="bg-gray-50 px-6 py-3">
              <h3 className="font-semibold text-gray-900">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
            </div>

            {matches.map((match) => (
              <div
                key={match._id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(match.matchDate)}</span>
                  </div>
                  <div className="flex items-center">
                    {getMatchStatus(match)}
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        match.status === "live"
                          ? "bg-red-100 text-red-800"
                          : match.status === "finished"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {match.status === "scheduled"
                        ? "Upcoming"
                        : match.status === "live"
                          ? "Live"
                          : "Finished"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex items-center space-x-3 flex-1">
                    {match.homeTeam.flag ? (
                      <Image
                        src={match.homeTeam.flag}
                        alt={match.homeTeam.name}
                        width={24}
                        height={16}
                        className="w-8 h-6 object-cover rounded"
                      />
                    ) : (
                      <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    )}
                    <span className="font-semibold text-gray-900">
                      {match.homeTeam.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {match.homeTeam.code}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center space-x-4 mx-6">
                    {match.status === "finished" || match.status === "live" ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900">
                          {match.homeScore}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {match.awayScore}
                        </span>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-500">
                          VS
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(match.matchDate).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center space-x-3 flex-1 justify-end">
                    <span className="text-gray-500 text-sm">
                      {match.awayTeam.code}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {match.awayTeam.name}
                    </span>
                    {match.awayTeam.flag ? (
                      <Image
                        src={match.awayTeam.flag}
                        alt={match.awayTeam.name}
                        width={24}
                        height={16}
                        className="w-8 h-6 object-cover rounded"
                      />
                    ) : (
                      <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{match.venue}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {match.group} •{" "}
                    {match.matchType.charAt(0).toUpperCase() +
                      match.matchType.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

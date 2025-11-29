// app/worldcup/teams/page.tsx
import Image from "next/image";
import Link from "next/link";

interface Team {
  _id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  fifaRanking: number;
  coach: string;
  stars: number;
  previousBest: string;
}

async function getTeams(): Promise<Team[]> {
  // API call to get teams
  return [];
}

export default async function TeamsPage() {
  const teams = await getTeams();
  const groups = Array.from(new Set(teams.map((team) => team.group))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black mb-4">Qualified Teams</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Meet the 48 teams competing for football's ultimate prize across
            USA, Canada, and Mexico
          </p>
        </div>
      </div>

      {/* Groups Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-4">
            {groups.map((group) => (
              <a
                key={group}
                href={`#group-${group}`}
                className="px-6 py-3 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg font-semibold whitespace-nowrap transition-all duration-300"
              >
                Group {group}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Teams by Group */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {groups.map((group) => {
          const groupTeams = teams.filter((team) => team.group === group);

          return (
            <section key={group} id={`group-${group}`} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  Group {group}
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-red-600"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {groupTeams.map((team) => (
                  <Link
                    key={team._id}
                    href={`/worldcup/teams/${team.code.toLowerCase()}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 overflow-hidden group"
                  >
                    {/* Team Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-white text-center">
                      <div className="w-20 h-20 mx-auto mb-4 relative">
                        <Image
                          src={team.flag}
                          alt={team.name}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{team.name}</h3>
                      <div className="text-sm opacity-90">
                        FIFA Rank: #{team.fifaRanking}
                      </div>
                    </div>

                    {/* Team Details */}
                    <div className="p-6">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coach:</span>
                          <span className="font-semibold">{team.coach}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Result:</span>
                          <span className="font-semibold">
                            {team.previousBest}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team Level:</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < team.stars
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="text-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                          View Team Profile →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

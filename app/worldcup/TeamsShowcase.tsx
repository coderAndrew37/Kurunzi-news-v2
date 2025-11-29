// components/TeamsShowcase.tsx
import Link from "next/link";
import Image from "next/image";

interface Team {
  _id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  fifaRanking: number;
  previousBest: string;
}

interface TeamsShowcaseProps {
  teams: Team[];
  title?: string;
}

export default function TeamsShowcase({
  teams,
  title = "Qualified Teams",
}: TeamsShowcaseProps) {
  const groups = Array.from(new Set(teams.map((team) => team.group))).sort();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            48 teams from around the world competing for football's ultimate
            prize
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mt-4"></div>
        </div>

        {/* Groups Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {groups.map((group) => (
            <button
              key={group}
              className="px-4 py-2 rounded-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Group {group}
            </button>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {teams.map((team) => (
            <Link
              key={team._id}
              href={`/worldcup/teams/${team.code.toLowerCase()}`}
              className="group text-center"
            >
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
                {/* Team Flag */}
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={team.flag}
                    alt={team.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>

                {/* Team Info */}
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {team.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold">FIFA Rank:</span>
                    <span>#{team.fifaRanking}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Group {team.group}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Teams CTA */}
        <div className="text-center mt-12">
          <Link
            href="/worldcup/teams"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore All 48 Teams
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

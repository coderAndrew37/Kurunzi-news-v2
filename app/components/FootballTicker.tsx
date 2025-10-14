"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Match {
  league: string;
  home: string;
  away: string;
  score: string;
  status: string;
}

export default function FootballTicker() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/football");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Failed to fetch football matches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-sm">Loading matches...</p>;
  if (!matches.length)
    return <p className="text-gray-500 text-sm">No live matches</p>;

  return (
    <div className="bg-green-50 border-t border-b border-green-100 py-3 overflow-hidden">
      <motion.div
        className="flex space-x-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...matches, ...matches].map((m, i) => (
          <div
            key={`${m.home}-${m.away}-${i}`}
            className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            <span className="text-xs font-semibold text-green-600">
              {m.league}
            </span>
            <span className="text-gray-800 font-medium">{m.home}</span>
            <span className="text-gray-600">{m.score}</span>
            <span className="text-gray-800 font-medium">{m.away}</span>
            <span className="text-xs text-gray-500">({m.status})</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

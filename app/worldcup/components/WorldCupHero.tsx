export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-green-800 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            FIFA World Cup 2026
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Coming to USA, Canada & Mexico. Follow the journey to the biggest
            football tournament on earth.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Latest News
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition">
              Match Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold">365</div>
              <div className="text-sm opacity-80">Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-80">Months</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2026</div>
              <div className="text-sm opacity-80">Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

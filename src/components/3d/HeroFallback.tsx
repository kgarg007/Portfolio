export default function HeroFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[350px] overflow-hidden pointer-events-none">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-cyan-500/10 rounded-full blur-3xl" />
      
      {/* Abstract Architectural SVG Sculpture Graphic */}
      <svg
        className="w-72 h-72 sm:w-96 sm:h-96 text-zinc-700/40 animate-pulse"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="60" stroke="#818cf8" strokeWidth="1" opacity="0.6" />
        <polygon points="100,30 160,140 40,140" stroke="#a78bfa" strokeWidth="1.5" opacity="0.7" fill="url(#grad1)" />
        <circle cx="100" cy="100" r="25" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
        <defs>
          <linearGradient id="grad1" x1="40" y1="30" x2="160" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

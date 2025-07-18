'use client'
import { useState, useEffect } from "react";


const platforms = [
  {
    name: "Tiktok",
    value: 8085,
    percentage: 80,
    gradientId: "grad1",
    radius: 90,
  },
  {
    name: "Instagram",
    value: 8085,
    percentage: 45,
    gradientId: "grad2",
    radius: 70,
  },
  {
    name: "Facebook",
    value: 8085,
    percentage: 25,
    solidColor: "#0095FF",
    radius: 50,
  },
];


export default function MostUsedPlatformChart() {
  const [period] = useState("This month");
  const size = 200;
  const center = size / 2;
  const strokeWidth = 10;

  // animated percentages state
  const [animatedPercents, setAnimatedPercents] = useState(
    platforms.map(() => 0)
  );

  useEffect(() => {
    let start: number | null = null;
    const duration = 1000; // 1 second
    const targetPercents = platforms.map((p) => p.percentage);

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      const newPercents = targetPercents.map(
        (target) => target * progress
      );
      setAnimatedPercents(newPercents);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  const renderRings = () =>
    platforms.map((p, i) => {
      const r = p.radius;
      const circ = 2 * Math.PI * r;
      const animatedPercent = animatedPercents[i] || 0;
      const dash = (animatedPercent / 100) * circ;
      const gap = circ - dash;

      const stroke = p.gradientId ? `url(#${p.gradientId})` : p.solidColor;

      return (
        <g key={i}>
          {/* Background ring */}
          <circle
            r={r}
            cx={center}
            cy={center}
            fill="none"
            stroke="#F2F3F9"
            strokeWidth={strokeWidth}
          />
          {/* Animated arc */}
          <circle
            r={r}
            cx={center}
            cy={center}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        </g>
      );
    });

  return (
    <div className="rounded-[20px] border bg-white border-[#F8F9FA] shadow-[0_4px_20px_0_#EEEEEE80] p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col mb-10 sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-[#05004E] font-semibold text-lg sm:text-lg">Most Used Platform</h2>
         <button className="flex items-center gap-2 border border-[#E0E0E0] px-3 py-2 rounded-lg text-sm text-[#05004E] font-medium hover:bg-[#F5F6FA] transition">
          <span>{period}</span>
          <svg width="12" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l5 5 5-5" stroke="#05004E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 ">
        <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] flex-shrink-0">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <defs>
              <linearGradient
                id="grad1"
                x1="0"
                y1="0"
                x2="200"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#00F7EF" />
                <stop offset="100%" stopColor="#F31830" />
              </linearGradient>
              <linearGradient
                id="grad2"
                x1="0"
                y1="0"
                x2="200"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F64E60" />
                <stop offset="100%" stopColor="#A700FF" />
              </linearGradient>
            </defs>
            {renderRings()}
          </svg>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
          {platforms.map((p, i) => (
            <div key={i} className="flex justify-between items-center lg:block">
              <div className="text-[#737791] text-sm">{p.name}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-[#05004E] font-bold text-lg sm:text-xl">
                  {p.value.toLocaleString()}
                </span>
                <span className="text-sm text-[#737791]">{p.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
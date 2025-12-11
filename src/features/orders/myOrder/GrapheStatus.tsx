interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface StatsGrapheProps {
  stats: StatItem[];
}

const SemiCircleChart: React.FC<StatsGrapheProps> = ({ stats }) => {
  const radius = 120;
  const strokeWidth = 10;
  const gap = 1.7; // Espacement entre les arcs
  const centerX = 135;
  const centerY = 135;

  // Calculer le total
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);

  // Calculer les pourcentages
  const statsWithPercent = stats.map((stat) => ({
    ...stat,
    percent: (stat.value / total) * 100,
  }));

  const createArc = (startPercent: number, endPercent: number) => {
    const startAngle = (startPercent / 100) * 180;
    const endAngle = (endPercent / 100) * 180;

    const startRadian = (startAngle * Math.PI) / 180;
    const endRadian = (endAngle * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(Math.PI - startRadian);
    const startY = centerY - radius * Math.sin(Math.PI - startRadian);
    const endX = centerX + radius * Math.cos(Math.PI - endRadian);
    const endY = centerY - radius * Math.sin(Math.PI - endRadian);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Générer les arcs
  let currentPercent = 0;
  const arcs = statsWithPercent.map((stat, index) => {
    const startPercent = currentPercent + (index > 0 ? gap : 0);
    const endPercent =
      currentPercent +
      stat.percent -
      (index < statsWithPercent.length - 1 ? gap : 0);
    currentPercent += stat.percent;

    return {
      ...stat,
      path: createArc(startPercent, endPercent),
    };
  });

  const backgroundArc = `M ${
    centerX - radius
  } ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;

  return (
    <div>
      <svg width={270} height={155}>
        {/* Fond */}
        <path
          d={backgroundArc}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />

        {/* Arcs colorés */}
        {arcs.map((arc, index) => (
          <path
            key={index}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        ))}

        {/* Texte central */}
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          className="text-3xl font-bold"
          fill="#1e293b"
        >
          {total}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="text-sm"
          fill="#64748b"
        >
          Total Commandes
        </text>
      </svg>

      {/* Légende */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {statsWithPercent.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: stat.color }}
            ></div>
            <span className="text-sm text-slate-700">
              {stat.label}: {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemiCircleChart;

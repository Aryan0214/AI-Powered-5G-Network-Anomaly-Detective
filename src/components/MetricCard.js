export default function MetricCard({ title, value, good }) {
    return (
      <div className={`p-3 rounded ${
        good ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
      } border`}>
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-mono">{value}</p>
      </div>
    );
  }
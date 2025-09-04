export default function FilterTabs({ active, onChange }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' }
  ];
  return (
    <div className="flex gap-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-3 py-1 rounded-full border ${active===t.key ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 dark:border-zinc-700'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
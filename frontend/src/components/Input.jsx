export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className||''}`}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className||''}`}
    />
  );
}
export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={`rounded-xl px-4 py-2 bg-indigo-600  hover:bg-indigo-700 disabled:opacity-60 ${className||''}`}
    >
      {children}
    </button>
  );
}
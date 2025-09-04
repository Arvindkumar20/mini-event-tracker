import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";


export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // ⬇️ पहली बार load होने पर localStorage से theme उठाओ
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // ⬇️ जब भी darkMode बदले → DOM + localStorage दोनों update करो
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light"); // ✅ remove भी करो
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light"); // ✅ light भी add करो
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 transition"
    >
      {darkMode ? <CiDark size={40}/> : <MdLightMode size={40}/>}
    </button>
  );
}

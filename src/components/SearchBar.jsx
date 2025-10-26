import { useState, useRef } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 500); 
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Movie Name..."
      className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import SearchBar from "./SearchBar.jsx";
import SortDropdown from "./SortDropdown.jsx";
import { useDebounce } from "../hooks/useDebounce.js";

export default function ThreadList() {
  // 🔹 Local state for filters
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // 🔹 Debounce search only
  const debouncedSearch = useDebounce(search, 300);

  // 🔹 Dynamic queryKey with filters
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => getThreads(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="filters">
        {/* 🔹 Wire UI to state */}
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {isError && <p className="err">Error: {error.message}</p>}

      {isPending ? (
        <p>Loading threads…</p>
      ) : (
        <ul className="threads">
          {data.map((t) => (
            <li className="card" key={t.id}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

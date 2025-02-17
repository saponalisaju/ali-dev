import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../secret";

const PagesList = () => {
  const [designations, setDesignations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/designation/fetchDesignation`,
          {
            params: { page, limit: 5, search },
          }
        );
        setDesignations(response.data.designations);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchData();
  }, [page, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {designations.map((page) => (
          <li key={page._id}>{page.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PagesList;

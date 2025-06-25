import React, { useState } from 'react';
import { useGetAllResults } from '../utils/useGetAllResults';

const AdminResultsPage = () => {
  const { data, isLoading } = useGetAllResults();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('score'); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [searchQuery, setSearchQuery] = useState('');
  const resultsPerPage = 10;

  const results = Array.isArray(data?.data) ? data.data : [];

  // Filter results based on user name
  const filteredResults = results.filter((attempt) =>
    attempt.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered results
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'score') {
      const scoreA = a.correctAnswers / a.totalQuestions;
      const scoreB = b.correctAnswers / b.totalQuestions;
      return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    } else if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
  });


  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstResult, indexOfLastResult);

  if (isLoading) return <div className="p-6 text-lg font-medium">Loading results...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
        <input
          type="text"
          placeholder="Search by user name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); 
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); 
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="score">Sort by Score</option>
            <option value="date">Sort by Date</option>
          </select>
          <button
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

      </div>

      {/* Results Table */}
      <div className="w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Correct</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Score (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentResults.length > 0 ? (
              currentResults.map((attempt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-800">{attempt.user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{attempt.user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(attempt.date).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{attempt.subject.name}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{attempt.totalQuestions}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-800">{attempt.correctAnswers}</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-green-600">
                    {((attempt.correctAnswers / attempt.totalQuestions) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center p-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1 text-sm text-gray-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminResultsPage;

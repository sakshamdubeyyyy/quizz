import React from 'react';

const ResultsTable = () => {
  const data = [
    { name: 'Alice Johnson', quiz: 'JavaScript Basics', result: 85, status: 'Passed' },
    { name: 'Bob Smith', quiz: 'React Fundamentals', result: 62, status: 'Passed' },
    { name: 'Charlie Brown', quiz: 'HTML & CSS', result: 40, status: 'Failed' },
  ];

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3">Participant Name</th>
            <th className="px-4 py-3">Quiz Name</th>
            <th className="px-4 py-3">Result (%)</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50"
            >
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">{row.quiz}</td>
              <td className="px-4 py-3">{row.result}%</td>
              <td
                className={`px-4 py-3 font-medium ${
                  row.status === 'Passed' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;

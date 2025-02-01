import React from 'react';

const DataPreview = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Data Preview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Verified</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{row.Name}</td>
                <td className="py-2 px-4 border-b">{row.Amount}</td>
                <td className="py-2 px-4 border-b">{row.Date}</td>
                <td className="py-2 px-4 border-b">{row.Verified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreview;
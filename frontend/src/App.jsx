import React, { useState } from 'react';
import FileUpload from './components/Fileupload';
import DataPreview from './components/Datapreview';


const App = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors);
        setShowModal(true);
      } else {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Excel Data Importer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {data.length > 0 && <DataPreview data={data} />}
      {showModal && 
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Validation Errors</h2>
        {errors.map((error, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">Sheet: {error.sheetName}</p>
            <p className="font-semibold">Row: {error.rowNumber}</p>
            <p className="text-red-500">Errors: {error.errors.join(', ')}</p>
          </div>
        ))}
        <button
          onClick={()=>{setShowModal(false)}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>
    </div>
      }
    </div>
  );
};

export default App;
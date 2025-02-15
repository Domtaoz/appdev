import React, { useState } from "react";

const App = () => {
  const [fileContent1, setFileContent1] = useState("");
  const [fileContent2, setFileContent2] = useState("");

  const handleFileUpload = (event, setFileContent) => {
    const file = event.target.files[0];

    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("กรุณาอัปโหลดไฟล์ .txt เท่านั้น!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-xl font-bold mb-4 text-center">📂 อัปโหลดไฟล์ข้อความ</h1>

        <div className="mb-4 w-full">
          <h2 className="font-semibold text-center">ไฟล์ที่ 1</h2>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setFileContent1)}
            className="border p-2 rounded w-full"
          />
          {fileContent1 && (
            <div className="mt-4 p-4 bg-gray-200 rounded">
              <h3 className="font-semibold">📄 เนื้อหาไฟล์ 1:</h3>
              <pre className="whitespace-pre-wrap text-gray-700">{fileContent1}</pre>
            </div>
          )}
        </div>

        <div className="w-full">
          <h2 className="font-semibold text-center">ไฟล์ที่ 2</h2>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setFileContent2)}
            className="border p-2 rounded w-full"
          />
          {fileContent2 && (
            <div className="mt-4 p-4 bg-gray-200 rounded">
              <h3 className="font-semibold">📄 เนื้อหาไฟล์ 2:</h3>
              <pre className="whitespace-pre-wrap text-gray-700">{fileContent2}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

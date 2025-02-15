import React, { useState } from "react";

const App = () => {
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (event) => {
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
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full"
        />
        {fileContent && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="font-semibold">📄 เนื้อหาไฟล์:</h2>
            <pre className="whitespace-pre-wrap text-gray-700">{fileContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

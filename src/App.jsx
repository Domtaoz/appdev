import React, { useState } from "react";

const App = () => {
  const [fileContent, setFileContent] = useState("");
  const [output, setOutput] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleCompile = async () => {
    try {
      // ตรวจสอบนามสกุลไฟล์จากชื่อไฟล์
      const fileExtension = fileContent.includes('def') ? ".py" : ".cpp";
  
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: fileContent, extension: fileExtension }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to compile: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result.error) {
        throw new Error(`Compilation failed: ${result.error}`);
      }
  
      setOutput(result.output);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-xl font-bold mb-4 text-center">📂 อัปโหลดโค้ดและคอมไพล์</h1>
        <input
          type="file"
          accept=".py,.cpp"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full"
        />
        {fileContent && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="font-semibold">📄 เนื้อหาไฟล์:</h2>
            <pre className="whitespace-pre-wrap text-gray-700">{fileContent}</pre>
          </div>
        )}
        <button
          onClick={handleCompile}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
        >
          คอมไพล์โค้ด
        </button>
        {output && (
          <div className="mt-4 p-4 bg-gray-300 rounded">
            <h3 className="font-semibold">📤 ผลลัพธ์:</h3>
            <pre className="whitespace-pre-wrap text-gray-700">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

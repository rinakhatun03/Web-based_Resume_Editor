import React, { useState } from "react";
import SectionEditor from "./components/SectionEditor";
import axios from "axios";

function App() {
  const [resume, setResume] = useState({
    Name: "Emily Smith",
    Summary: "Ambitious and strong in design and integration with intuitive problem-solving skills.",
    Experience: ["XYZ Company - 3 years "],
    Education: "B.Tech in Computer Science and Engineering",
    Skills: ["Python", "Java", "JavaScript", "React"]
  });

  const handleChange = (section, content) => {
    setResume({ ...resume, [section]: content });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Mock parsing: ${file.name}`);
      setResume({
        Name: "Emily Smith",
        Summary: "Ambitious and strong in design and integration with intuitive problem-solving skills.",
        Experience: ["XYZ Company - 3 years"],
        Education: "B.Tech in Computer Science and Engineering",
        Skills: ["Python", "Java", "JavaScript", "React"]
      });
    }
  };

  const saveResume = async () => {
    try {
      const res = await axios.post("http://localhost:8000/save-resume", { resume });
      alert(`Resume saved! ID: ${res.data.id}`);
    } catch (err) {
      alert("Error saving resume.");
    }
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Resume Editor</h1>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        style={{ marginBottom: "1rem" }}
      />
      <br />

      {Object.entries(resume).map(([section, content]) => (
        <SectionEditor
          key={section}
          title={section}
          value={content}
          onChange={handleChange}
        />
      ))}

      <button onClick={saveResume} style={{ marginRight: "1rem" }}>Save Resume</button>
      <button onClick={downloadResume}>Download as JSON</button>
    </div>
  );
}

export default App;

import React from "react";
import axios from "axios";

function SectionEditor({ title, value, onChange }) {
  const isArray = Array.isArray(value);

  const enhanceSection = async (index = null) => {
    const content = isArray ? value[index] : value;
    const res = await axios.post("http://localhost:8000/ai-enhance", {
      section: title.toLowerCase(),
      content
    });

    if (isArray) {
      const newArr = [...value];
      newArr[index] = res.data.enhanced_content;
      onChange(title, newArr);
    } else {
      onChange(title, res.data.enhanced_content);
    }
  };

  const updateValue = (newVal, index = null) => {
    if (isArray) {
      const updated = [...value];
      updated[index] = newVal;
      onChange(title, updated);
    } else {
      onChange(title, newVal);
    }
  };

  const addItem = () => {
    onChange(title, [...value, ""]);
  };

  const removeItem = (index) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(title, updated);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>{title}</h3>
      {isArray ? (
        value.map((item, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>
            <textarea
              rows={2}
              cols={50}
              value={item}
              onChange={(e) => updateValue(e.target.value, index)}
            />
            <button onClick={() => enhanceSection(index)}>Enhance</button>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))
      ) : (
        <>
          <textarea
            rows={4}
            cols={50}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
          <br />
          <button onClick={() => enhanceSection()}>Enhance</button>
        </>
      )}
      {isArray && <button onClick={addItem}>+ Add {title}</button>}
    </div>
  );
}

export default SectionEditor;

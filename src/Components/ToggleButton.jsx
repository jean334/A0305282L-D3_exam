import React, { useState } from "react";

const ToggleButtons = ({props}) => {
  //const [selected, setSelected] = useState(null);
  
  const buttons = [
    { id: 1, label: "positive" },
    { id: 2, label: "negative" },
    { id: 3, label: "neutral" },
  ];

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {buttons.map((button) => (
        <div key={button.id} style={{ textAlign: "center" }}>
          <button
            onClick={() => props.setSelected(button.id)}
            style={{
              padding: "10px 5px",
              backgroundColor: props.selected === button.id ? "#F5CB5C" : "#424242",
              color: "#FDF0D5",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {button.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToggleButtons;

// Approach: Let's first create a component so that we can use it further in differeent places of the application. There will be two type of accordion. 1st will be single selection 2nd will be multi selection

import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function AccordionComponent() {
  // State variables
  const [selected, setSelected] = useState(null); // For single selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Toggle multi-selection mode
  const [multiple, setMultiple] = useState([]); // For multi-selection

  // Function to handle single selection
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Function to handle multi-selection
  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple]; // Create a copy of the multi-selection array
    const findIndexofCurrentId = copyMultiple.indexOf(getCurrentId);

    // If the item is not in the array, add it; otherwise, remove it
    if (findIndexofCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexofCurrentId, 1);
    }

    setMultiple(copyMultiple); // Update the state with the modified array
  }

  return (
    <div className="wrapper">
      {/* Button to toggle multi-selection mode */}
      {/* Button to toggle multi-selection mode */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection
          ? "Disable Multi Selection"
          : "Enable Multi Selection"}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          // Loop through the data items
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              {/* Title section */}
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {/* Content section based on the selection type */}
              {enableMultiSelection
                ? // Display content if the item is in the multi-selected list
                  multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : // Display content if the item is the single selected item
                  selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
}

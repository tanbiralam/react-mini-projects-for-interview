//Question: How does the RandomColorGenerator component in React work, and how are the random colors generated based on the user's choice of color type (HEX or RGB)?

//Approach: The `RandomColorGenerator` React component allows users to generate random colors in either HEX or RGB formats. It uses two state variables: `typeOfColor` to determine the color type and `color` to store the generated value. Utility functions generate these colors: `handleCreateRandomHexColor()` for HEX and `handleCreateRandomRGBColor()` for RGB. A `useEffect` hook updates the color when the type changes. Users can select their desired color format through interactive buttons.


import { useEffect, useState } from "react";

// Define the RandomColorGenerator component
export default function RandomColorGenerator() {
  // Initialize state variables for the type of color and the generated color
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  // Utility function to generate a random number up to a given length
  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  // Handler function to create a random HEX color
  function handleCreateRandomHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9,0, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    // Set the generated HEX color to state
    setColor(hexColor);
  }

  // Handler function to create a random RGB color
  function handleCreateRandomRGBColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    // Set the generated RGB color to state
    setColor(`rgb(${r},${g},${b})`);
  }

  // Use the useEffect hook to generate a color when the typeOfColor state changes
  useEffect(() => {
    if (typeOfColor === 'rgb') {
        handleCreateRandomRGBColor();
    }
    else {
        handleCreateRandomHexColor();
    }
  }, [typeOfColor]);

  // Render the component UI
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: color,
      }}
    >
      {/* Buttons to set the type of color */}
      <button onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
      {/* Button to generate a random color */}
      <button
        onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHexColor
            : handleCreateRandomRGBColor
        }
      >
        Generate Color
      </button>
      {/* Display the current color type and value */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '60px',
        marginTop: '50px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}

import React, { useState } from "react";
function App() {
  const [minutes, setMinutes] = useState(0);
  return (
    <div>
      <div>Time Converter</div>
      <div>
        Minutes{" "}
        <input
          placeholder="Minutes"
          value={minutes}
          type="number"
          onChange={(event) => {
            setMinutes(event.target.value);
          }}
        />
        <div>
          Hours
          <input
            type="number"
            placeholder="Hours"
            value={Math.floor(minutes / 60)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

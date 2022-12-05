import React, { useEffect, useState } from "react";
import { MdOutlineDataSaverOff } from "react-icons/md";

function See() {
  const [listening, setListening] = useState(false);
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);
  let eventSource = undefined;

  const onDatas = (target) => {
    setDatas(target);
  };
  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("http://localhost:8083/sse");

      eventSource.onmessage = (event) => {
        data.push(event.data);
        console.log(data);

        // onDatas(event.data);
      };
      onDatas(data);
      //   eventSource.addEventListener("Progress", (event) => {
      //     const result = JSON.parse(event.data);
      //     console.log("received:", result);
      //     setData(result);
      //   });

      eventSource.onerror = (event) => {
        console.log(event.target);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };
      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log("event closed");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect");
    setDatas(data);
  }, [data]);
  return (
    <div className="App">
      <header className="App-header">
        Received Data
        <ul>
          {datas.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default See;

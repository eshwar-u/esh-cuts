import { useState, useEffect } from "react";

function BookContent() {
  const [content] = useState("haircutType");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  //const [availDates, setAvailDates] = useState([]);
  //const [isImported, setIsImported] = useState(false);

  const handleClick = () => {
    console.log("email:", email);
    console.log("name:", name);
    console.log("date:", date);
    console.log("time:", time);
    // You can log any data or message you want here
    //check for user account, if not create one
    //change the date that needs to be changed
  };

  useEffect(() => {
    const apiCall = async (date: string) => {
      console.log("in the apiCall method");
      const result = await fetch(
        `https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/appointments?appt_date=${date}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "false",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("the result is:" + result.body);
    };

    const startHour = 10; // 10 am
    const endHour = 19; // 7 pm
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

    const formatDate = (date: Date) => {
      const YYYY = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const DD = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
    };

    const loopDates = () => {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1); // Start with the next day
      currentDate.setHours(startHour, 0, 0, 0); // Set to 10 am

      while (currentDate <= twoWeeksFromNow) {
        for (let hour = startHour; hour <= endHour; hour++) {
          currentDate.setHours(hour);
          const formattedDate = formatDate(currentDate);
          apiCall(formattedDate);
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        currentDate.setHours(startHour, 0, 0, 0); // Reset to 10 am
      }
    };

    apiCall();
  }, []);

  if (content == "haircutType") {
    return (
      <>
        <p>book here! Message me on instagram @eshcuts BEFORE booking</p>
        <br></br>
        <text>input your email: </text>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br></br>
        <text>input your name (first and last): </text>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <text>Input the date you would like to book: </text>
        <input
          type="text"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <br></br>
        <text>input the time you would like to book: </text>
        <input
          type="text"
          id="time"
          onChange={(e) => setTime(e.target.value)}
        ></input>

        <button onClick={handleClick}>Proceed</button>
      </>
    );
  }
  return (
    <>
      <p>book here! Message me on instagram @eshcuts BEFORE booking</p>
    </>
  );
}
/*
<ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
*/

export default BookContent;

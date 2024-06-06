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
    const apiCall = async () => {
      console.log("in the apiCall method");
      const result = await fetch(
        "https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/appointments?appt_id=1",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("the result is:" + result);
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

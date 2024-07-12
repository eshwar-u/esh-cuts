import { useState, useEffect } from "react";

function BookContent() {
  const [content] = useState("haircutType");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availDates, setAvailDates] = useState<any[]>([]);
  //const [isImported, setIsImported] = useState(false);

  const createUser = async (name: string, email: string) => {
    var first_and_last = name.split(" ");
    const result = await fetch(
      `https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/users`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "false",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_firstname: first_and_last[0],
          user_lastname: first_and_last[1],
        }),
      }
    );
    var jsonParsedContents = await result.json();
    return jsonParsedContents.body;
  };

  const getUser = async (name: string, email: string) => {
    var first_and_last = name.split(" ");
    const result = await fetch(
      `https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/users?user_email=${email}&user_firstname=${first_and_last[0]}&user_lastname=${first_and_last[1]}`,
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
    var jsonParsedContents = await result.json();
    return jsonParsedContents.body;
  };

  const createAppointment = async (
    user_id: string,
    date: string,
    time: string
  ) => {
    const result = await fetch(
      `https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/appointments`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "false",
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.6.0",
        },
        body: JSON.stringify({
          user_id: user_id,
          appointment_date: date,
          appointment_time: time,
        }),
      }
    );
    var jsonParsedContents = await result.json();
    return jsonParsedContents.body;
  };

  const handleClick = async () => {
    console.log("email:", email);
    console.log("name:", name);
    console.log("date:", date);
    console.log("time:", time);

    try {
      let user = await getUser(name, email);
      if (!user) {
        await createUser(name, email);
        user = await getUser(name, email);
      }

      if (user) {
        const user_id = user.user_id;
        await createAppointment(user_id, date, time);
        console.log("Appointment created successfully");

        console.log(availDates);

        // Remove the appointment from visibility
        // You can implement this part as per your UI framework/library
      } else {
        console.log("Error: User could not be found or created");
      }
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  useEffect(() => {
    const apiCall = async (date: string) => {
      const result = await fetch(
        `https://iwxclylnoe.execute-api.us-east-2.amazonaws.com/test/appointments?appt_date=${date}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "false",
            "Content-Type": "application/json",
            "User-Agent": "insomnia/8.6.0",
          },
        }
      );
      var jsonParsedContents = await result.json();
      console.log("the result is:" + jsonParsedContents.body);
      //fix this, store all the dates in a state object
      if (jsonParsedContents.user_id == null) {
        setAvailDates((prevDates) => [...prevDates, jsonParsedContents]);
      }
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
    loopDates();
  }, []);

  //CHANGE THIS STUFF AND MAKE THE UI LOOK BETTER

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

export default BookContent;

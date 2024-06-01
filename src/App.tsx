import "./App.css";
import Navbar from "./components/Navbar";
import Contents from "./components/Contents";
import { useState } from "react";

function App() {
  const [content, setContent] = useState("PricesContent");

  return (
    <>
      <Navbar
        button1="About me"
        button2="Book Appointment"
        button3="Contact Me"
        setContent={setContent}
      />
      <Contents content={content} />
    </>
  );
}

export default App;
//set up the database-
//change automation scripts that use the database
//create the rest api/check how to connect it to the react application-
//add things to lambdas/aws-
//change the layout of the website based on what durga says

//use get api to get dates for bookcontent
//display them on the website
//when the user submits an appointment make a user account and update the appointment
//update the appointment script (put on lambdas)
//update the email script (put on lambdas)

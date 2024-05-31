//this class holds the structure of the content
//will call the correct content button based on the Content variable
//will recieve the Content variable through the App class
//App class recieves the button click through the navbar

import BookContent from "./BookContent";
import PricesContent from "./PricesContent";
import { useState } from "react";
import "./Contents.css";

interface Props {
  content: string;
}

function Contents({ content }: Props) {
  console.log("These are the prices");
  if (content == "PricesContent") {
    return (
      <>
        <div className="text">
          <PricesContent />
        </div>
      </>
    );
  } else if (content == "BookContent") {
    return (
      <>
        <div className="text">
          <BookContent />
        </div>
      </>
    );
  }
  return (
    <>
      <p>This is content</p>
    </>
  );
}

export default Contents;

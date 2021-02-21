import React from "react";
import { Link } from "react-router-dom";
import AddCreditCard from "./AddCreditCard";
import "./home.css";
function Home() {
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }
  let tempValue = [];
  allStorage().forEach(function (object) {
    let item = JSON.parse(object);
    return tempValue.push(item);
  });
  let finalCards = [];
  tempValue.map((item) => {
    return finalCards.push(
      <Link to={`/cards/${item.id}/edit`} className="link-text">
        <AddCreditCard
          key={item.id.input1}
          nameProp={item.name}
          cardNumberProp={item.cardNumber}
          expDateProp={item.expDate}
          showHide={true}
        />
      </Link>
    );
  });

  return (
    <div>
      {finalCards}
      <Link to="/cards/add" className="link-text">
        <div className="credit-card-add">
          <span>+</span>
        </div>
      </Link>
    </div>
  );
}

export default Home;

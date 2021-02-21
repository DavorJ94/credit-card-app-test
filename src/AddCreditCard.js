import React, { useEffect, useState } from "react";
import "./AddCreditCard.css";
import iconChip from "./images/icon-chip.png";
import visa from "./images/visa.png";
import mastercard from "./images/MasterCard.png";
import discover from "./images/Discover.png";

function AddCreditCard({
  nameProp = "",
  cardNumberProp = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  },
  expDateProp = "",
  showHide = false,
}) {
  const [name, setName] = useState(nameProp);
  const [cardNumber, setCardNumber] = useState(cardNumberProp);
  const [expDate, setExpDate] = useState(expDateProp);
  const [submit, setSubmit] = useState(false);
  const [cardNumOk, setCardNumOk] = useState(false);
  const [expDateOk, setExpDateOk] = useState(false);
  const changeName = (e) => {
    setName(e.target.value);
  };

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear().toString().substr(-2);
  useEffect(() => {
    if (
      cardNumber.input1[0] == 4 ||
      cardNumber.input1[0] == 5 ||
      cardNumber.input1[0] == 6
    ) {
      setCardNumOk(true);
    } else {
      setCardNumOk(false);
    }
    if (expDate.substr(0, 2) >= mm && expDate.substr(3) >= yyyy) {
      setExpDateOk(true);
    } else {
      setExpDateOk(false);
    }
  }, [cardNumber, expDate]);
  useEffect(() => {
    if (cardNumOk === true && expDateOk === true) {
      setSubmit(true);
    }
  }, [cardNumOk, expDateOk]);
  const changeCardNumber = (e) => {
    setCardNumber((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (cardNumOk && expDateOk) {
      const localStorageItem = {
        name: name,
        cardNumber: cardNumber,
        expDate: expDate,
        id: cardNumber.input1,
      };
      localStorage.setItem(
        `${cardNumber.input1}`,
        JSON.stringify(localStorageItem)
      );
    } else {
      alert(`Correct following information:
      ${cardNumOk ? "" : "Card number"}
      ${expDateOk ? "" : "Expiration date"}`);
    }
  };
  const expDateChange = (e) => {
    setExpDate(e.target.value);
  };
  return (
    <div>
      <div className="credit-card">
        <img src={iconChip} alt="icon chip" className="icon-chip"></img>
        <img
          src={
            cardNumber.input1[0] === "4"
              ? visa
              : cardNumber.input1[0] === "5"
              ? mastercard
              : cardNumber.input1[0] === "6"
              ? discover
              : visa
          }
          alt="card logo"
          className="credit-card__logo"
        ></img>
        <div className="card_number">
          {cardNumber.input1 === ""
            ? "XXXX XXXX XXXX XXXX"
            : `${cardNumber.input1} ${cardNumber.input2} ${cardNumber.input3} ${cardNumber.input4}`}
        </div>
        <div className="inputNameAndDate">
          <div className="username_add">{name === "" ? "USER NAME" : name}</div>
          <div className="expiration_date">
            {expDate === "" ? "XX/XX" : expDate}
          </div>
        </div>
      </div>
      <form className="formInput" style={showHide ? { display: "none" } : null}>
        <label htmlFor="username">Name:</label>
        <input
          name="username"
          value={name}
          onChange={changeName}
          className="inputUsername"
        />
        <label htmlFor="input1">Card Number:</label>
        <div className="card-number-input">
          <input
            name="input1"
            value={cardNumber.input1}
            onChange={changeCardNumber}
            className="input-card-num"
          />
          <input
            name="input2"
            value={cardNumber.input2}
            onChange={changeCardNumber}
            className="input-card-num"
          />
          <input
            name="input3"
            value={cardNumber.input3}
            onChange={changeCardNumber}
            className="input-card-num"
          />
          <input
            name="input4"
            value={cardNumber.input4}
            onChange={changeCardNumber}
            className="input-card-num"
          />
        </div>
        <label htmlFor="exp-date">Expires: </label>
        <input
          name="exp-date"
          value={expDate}
          onChange={expDateChange}
          className="expDate"
        />
        <button
          disabled={!submit}
          type="submit"
          className="buttonSave"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default AddCreditCard;

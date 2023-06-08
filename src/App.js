import React, { useState } from "react";
import "./index.css";
import bgMobile from "../src/images/bg-main-mobile.png";
import bgDesktop from "../src/images/bg-main-desktop.png";
import logo from "./images/card-logo.svg";
import tick from "./images/icon-complete.svg";
import { format } from "date-fns";

const App = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/01");
  const [cvc, setCvc] = useState("");

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap 8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 grid grid-cols-1  ">
            <article className="front-card p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {cardNumber}
                </h2>
                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {name}{" "}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                    {format(new Date(date), "MM / yy")}
                  </li>
                </ul>
              </div>
            </article>
            <article className="back-card relative ml-14 mb-10">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest ">
                {cvc}
              </p>
            </article>
          </div>

          <div className="pt-8 px-5 pb-20">
            {!confirmed && (
              <form className="flex flex-col justify-center lg:h-screen ml-20  max-w-lg ">
                <div>
                  <label htmlFor="cardholder" id="cardholder">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    name="cname"
                    id="cname"
                    placeholder="e.g Mark Sila"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="number">card number</label>
                  <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <article className="flex items-center justify-between gap-8 ">
                  <div className="flex-1">
                    <label htmlFor="expiry">Exp. Date(MM/YY)</label>
                    <input
                      type="month"
                      name="expiry"
                      id="expiry"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label>CVC</label>
                    <input
                      type="number"
                      name="CVC"
                      id="cvc"
                      placeholder="e.g 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                  </div>
                </article>
                <button
                  onClick={() => setConfirmed(true)}
                  className="btn mt-8 p-3 rounded text-base tracking-wide lg:text-lg"
                >
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
};

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thanks flex flex-col justify-center items-center lg:h-screen max-w-lg mx-auto ">
        <img src={tick} alt="" className="block mx-auto" />
        <h1 className="text-slate-800 text-3xl uppercase text-center my-6">
          Thank You
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="btn block p-4 mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default App;

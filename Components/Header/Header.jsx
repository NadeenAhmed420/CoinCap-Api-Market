import "./Header.css";
import { useState, useEffect } from "react";

function Header({ toggle }) {
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        setCurrencyData(data.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  //Print Button
  const handlePrint = () => {
    const printContent = document.getElementById("content").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <>
      <header>
        <div className="header d-flex justify-content-between align-items-center ">
          <div className="menu ">
            <img
              src="./assets/menu.png"
              alt=""
              className="menu-bar"
              onClick={toggle}
            />
          </div>
          <div className="search-bar ps-4">
            <img src="./assets/search.png" alt="" className="search-img" />
            <input type="search" placeholder="Search or type a command" />
          </div>

          <div className="profile d-flex align-items-center gap-4 me-3 ">
            <img src="./assets/settings.png" alt="" />
            <img src="./assets/Notification.png" alt="" />
            <img src="./assets/user.png" alt="" width={35} />
          </div>
        </div>

        <div className="print d-flex justify-content-between align-items-center mt-4 mx-3 ">
          <h4 className="fw-bold ">Overview</h4>
          <button
            className=" btn d-flex gap-2 align-items-center"
            onClick={handlePrint}
          >
            <img src="./assets/print.png" alt="" />
            Print
          </button>

          <div id="content">
            <h1>CoinCap Market Data</h1>
            {currencyData &&
              currencyData.map((currency) => (
                <div key={currency.id}>
                  <h3>
                    {currency.name}{" "}
                    <span className="text-info"> ({currency.symbol})</span>
                  </h3>
                  <h5>
                    Market Cap:
                    <span className="text-info">
                      ${parseFloat(currency.marketCapUsd).toFixed(0)}
                    </span>
                    <hr />
                  </h5>
                </div>
              ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

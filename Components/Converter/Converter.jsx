import "./Converter.css";
import { useState, useEffect } from "react";

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("bitcoin");
  const [selectedToCurrency, setSelectedToCurrency] = useState("ethereum");
  const [amount, setAmount] = useState("");

  const [fromCurrencyPrice, setFromCurrencyPrice] = useState(null);
  const [toCurrencyPrice, setToCurrencyPrice] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [fromCurrencySymbol, setFromCurrencySymbol] = useState("");
  const [changePercent24Hr, setChangePercent24Hr] = useState(null);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data.data);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, []);
  333;

  useEffect(() => {
    if (currencies.length > 0) {
      setFromCurrencySymbol(currencies[0].symbol);
      setChangePercent24Hr(currencies[0].changePercent24Hr);
    }
  }, [currencies]);

  //Fetch Data And Get PriceUsd For Every Currency
  useEffect(() => {
    if (selectedFromCurrency && selectedToCurrency) {
      fetch(`https://api.coincap.io/v2/assets/${selectedFromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setFromCurrencyPrice(data.data.priceUsd);
        })
        .catch((error) => {
          console.error("Error fetching price of 'from' currency:", error);
        });

      fetch(`https://api.coincap.io/v2/assets/${selectedToCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setToCurrencyPrice(data.data.priceUsd);
        })
        .catch((error) => {
          console.error("Error fetching price of 'to' currency:", error);
        });
    }
  }, [selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {
    //check that all data enter before convertion >> return null
    if (!fromCurrencyPrice || !toCurrencyPrice || !amount) {
      setConvertedAmount(null);
      return;
    }
    // if all data enter then make convertion
    const conversionRate =
      parseFloat(fromCurrencyPrice) / parseFloat(toCurrencyPrice);
    const converted = parseFloat(amount) * conversionRate;
    setConvertedAmount(converted.toFixed(6));
  });

  //() select (from)
  const handleFromCurrencyChange = (event) => {
    setSelectedFromCurrency(event.target.value);
  };

  //() select (to)
  const handleToCurrencyChange = (event) => {
    setSelectedToCurrency(event.target.value);
  };

  //() input (amount entered)
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Swap currencies (from-to)
  const handleSwap = () => {
    setSelectedFromCurrency(selectedToCurrency);
    setSelectedToCurrency(selectedFromCurrency);
  };

  //Buy Div
  //Based Nn The Selected Currency Display The (symbol,changePercent24Hr)
  const handleSymbolAnd24HChange = (event) => {
    const selectedCurrencyId = event.target.value; // SELECTED VALUE
    const selectedCurrency = currencies.find(
      (currency) => currency.id === selectedCurrencyId
    );
    setSelectedFromCurrency(selectedCurrencyId); //VALUE
    setFromCurrencySymbol(selectedCurrency.symbol); //Symbol
    setChangePercent24Hr(selectedCurrency.changePercent24Hr); //24H
  };

  //Payment Method Div
  const handlePaymentMethodSelect = (event) => {
    const selectedPaymentMethod = event.target.value;
  };
  const paymentMethods = [
    { id: 1, name: "Pay Pal", icon: "./assets/paypal.png" },
    { id: 2, name: "Credit Card", icon: "./assets/paypal.png" },
    { id: 3, name: "Master Card", icon: "./assets/master.png" },
    { id: 4, name: "Apple Pay", icon: "./assets/master.png" },
    { id: 5, name: "Google Pay", icon: "./assets/master.png" },
  ];

  return (
    <>
      <section className="converter ">
        <div className="card p-4">
          <h5>Converter</h5>
          <div className="mt-3">
            <h6 className="d-flex gap-2 align-items-center">
              Amount
              <img src="./assets/question.png" alt="" />
            </h6>
            <input
              type="text"
              placeholder="0.00"
              className="p-0"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="d-flex gap-2 align-items-center  mt-4 ">
            {/* Start From-To Convert Div */}
            <div className="from-to p-3 ">
              {/* FROM DIV */}
              <div className="d-flex gap-3 align-items-center">
                <span className="from">From</span>
                <select
                  value={selectedFromCurrency}
                  onChange={handleFromCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.name}
                    </option>
                  ))}
                </select>
                <img
                  src="./assets/right-arrow.png"
                  alt=""
                  className="right-arrow"
                />
              </div>
              <hr />
              {/* TO DIV */}
              <div className="d-flex gap-3 align-items-center mt-3">
                <span className="">To</span>
                <select
                  className="ms-4"
                  value={selectedToCurrency}
                  onChange={handleToCurrencyChange}
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.name}
                    </option>
                  ))}
                </select>
                <img
                  src="./assets/right-arrow.png"
                  alt=""
                  className="right-arrow"
                />
              </div>
            </div>
            {/* End From-To Convert Div */}
            <div
              className="swap d-flex justify-content-center align-items-center px-2"
              onClick={handleSwap}
            >
              <img src="./assets/swap.png" alt="" width={20} />
            </div>
            {/* End of Swap Convert Div */}
          </div>
          <div className="result mt-4 px-3 py-2">
            <span> AMOUNT</span>
            <h6 className="mt-2">{convertedAmount}</h6>
          </div>
        </div>

        <div className="card card-2 mt-4 p-4">
          <div className="d-flex justify-content-evenly ">
            <button className="btn px-5">Buy</button>
            <button className="btn px-5">Sell</button>
          </div>

          <input type="text" className="mt-5 border-0" placeholder="$0" />
          <p className="m-auto mt-3 text-black-50">You can buy up to $25,000</p>

          <div className="from-to p-3 mt-4 ">
            <div className="d-flex gap-3 align-items-center">
              <span className="from">Buy</span>
              <select
                value={selectedFromCurrency}
                onChange={handleSymbolAnd24HChange}
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
              <img
                src="./assets/right-arrow.png"
                alt=""
                className="right-arrow"
              />
            </div>
            <div className="d-flex align-items-center">
              <span className="ms-5 symbol-balance">
                {fromCurrencySymbol} Balance
              </span>
              <span className="ms-auto symbol-24h">
                {parseFloat(changePercent24Hr).toFixed(3)} {fromCurrencySymbol}
              </span>
            </div>
            <hr />
            <div>
              <div className="d-flex gap-3 align-items-center">
                <span className="pay">Pay </span>
                <select onChange={handlePaymentMethodSelect}>
                  {paymentMethods.map((method) => (
                    <option key={method.id}>{method.name}</option>
                  ))}
                </select>

                <img
                  src="./assets/right-arrow.png"
                  alt=""
                  className="right-arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Converter;

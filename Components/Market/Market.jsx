import "./Market.css";
import { useState, useEffect } from "react";

const Market = () => {
  const [tableData, setTableData] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleString());
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * 8; //(2-1)=1..>1*8=8(start) ...> 8+8=16(end)
  const endIdx = startIdx + 8;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const updateTime = () => {
    setTime(new Date().toLocaleString());
  };

  const updateCurrencies = () => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.data);
        updateTime();
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    updateCurrencies();
    // update currencies every 1 minute
    const interval = setInterval(updateCurrencies, 60000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="market p-4 ">
        <div>
          <div className="update d-flex justify-content-between my-3">
            <div className="title">
              <h3>Markets</h3>
            </div>

            <div className=" d-flex gap-3 align-items-center">
              <span> Last Updated: {time}</span>
              <button
                id="updateButton "
                className="btn trade-btn d-flex gap-2 align-items-center"
                onClick={updateCurrencies}
              >
                <img src="./assets/refresh.png" alt="" width={15} />
                Update
              </button>
            </div>
          </div>
          {/* start of Menu */}
          <div className="menu d-flex gap-5 mb-3">
            <div>
              <span>Spot Holdings</span>
            </div>
            <div className="d-flex gap-2 align-items-center ">
              <img src="./assets/fire.png" alt="" />
              <span className="active">Hot</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <img src="./assets/favourite.png" alt="" />
              <span>Favorites</span>
            </div>
          </div>
          {/* End of Menu */}

          <hr />
          <table className="table table-responsive ">
            <thead>
              <tr className="table-light">
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {tableData.slice(startIdx, endIdx).map((data, i) => (
                <tr key={i}>
                  <td className=" d-flex flex-column data-table-symbol">
                    {data.symbol}
                    <span className="data-table-name">{data.name}</span>
                  </td>

                  <td className="data-table-price">
                    ${parseFloat(data.priceUsd).toFixed(2)}
                  </td>

                  <td
                    className="data-table-change"
                    style={{
                      color:
                        parseFloat(data.changePercent24Hr) > 1
                          ? "#52C41A"
                          : "#FF4D4F",
                    }}
                  >
                    {parseFloat(data.changePercent24Hr).toFixed(2)}%
                  </td>

                  <td className="trade">
                    <button className="btn trade-btn">Trade</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div className="page-number d-flex justify-content-end gap-3">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className="btn "
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;

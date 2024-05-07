import "./Overview.css";
export default function Overview() {
  return (
    <>
      <section className=" overview mb-4">
        {/* <div className="d-flex justify-content-between align-items-center mb-3 ">
          <h4 className="fw-bold ms-2 ">Overview</h4>
          <button className="print btn d-flex gap-2 align-items-center">
            <img src="./assets/print.png" alt="" />
            Print
          </button>
        </div> */}
        <div className="card p-4 ">
          <div className="total d-flex justify-content-between align-items-center ">
            <h6>Total Balance</h6>
            <div className="buttons d-flex gap-3 ">
              <button className="btn d-flex gap-2 align-items-center">
                <img src="./assets/arrow.png" alt="" />
                Withdraw
              </button>
              <button className="btn d-flex gap-2 align-items-center border rounded-3">
                <img src="./assets/deposit.png" alt="" />
                Deposit
              </button>
            </div>
          </div>

          <div>
            <div className="d-flex gap-2 align-items-center">
              <span className="fw-bolder fs-3">0.26231428</span>
              <img src="./assets/unit BTC.png" alt="" />
            </div>
            <span className=" fw-bold text-black-50 mt-1">3,700.96 USD</span>
          </div>

          <div className="row mt-4 d-flex gap-3">
            <div className="col-lg-3 border py-3 rounded-3">
              <div
                className="small-card
              d-flex gap-2 align-items-center"
              >
                <img src="./assets/Exchange.png" alt="" />
                <span>Exchange Balance</span>
              </div>
              <div className="money ms-4 mt-1">
                <span>0.256567545 BTC</span> <br />
                <span>3,700.96 USD</span>
              </div>
            </div>
            <div className="col-lg-3 border py-3 rounded-3 ">
              <div className="small-card d-flex gap-2 align-items-center">
                <img src="./assets/Assets.png" alt="" />
                <span>Asset Balances</span>
              </div>
              <div className="money ms-4 mt-1">
                <span>0.256567545 BTC</span> <br />
                <span>3,700.96 USD</span>
              </div>
            </div>

            <div className="col-lg-5 progresss">
              <div className="prog-1">
                <span>Exchange Balance</span>
                <div></div>
              </div>
              <div className="prog-2 mt-3">
                <span>Asset Balances</span>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

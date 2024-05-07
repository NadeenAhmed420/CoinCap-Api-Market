import "./SideMenu.css";

function SideMenu({ isOpen }) {
  const sideMenuClass = isOpen ? "side-menu open" : "side-menu";

  //Close Side-Menu
  const handleClose = () => {
    const close = document.querySelector(".side-menu");
    close.classList.toggle("open");
  };

  return (
    <>
      <aside className={sideMenuClass}>
        <div>
          <div className="top mb-4 pt-3">
            <div className="logo d-flex gap-2 align-items-center">
              <img src="./assets/Logo.png" alt="" />
              <h4 className="mt-2">Logoipsum</h4>
            </div>

            <div className="close me-lg-3 me-lg-3" onClick={handleClose}>
              <img src="./assets/close.png" alt="" />
            </div>
          </div>
          {/* <!-- start sidebar  --> */}
          <div className="sidebar">
            <a href="#" className="active">
              <img src="./assets/overview.png" alt="" />
              <h5>Overview</h5>
            </a>
            <a href="#">
              <img src="./assets/activity.png" alt="" />
              <h5>Activity</h5>
            </a>

            <a href="#">
              <img src="./assets/spreedsheet.png" alt="" />
              <h5>Spreadsheets</h5>
            </a>
            <a href="#">
              <img src="./assets/cupons.png" alt="" />
              <h5>Coupons</h5>
            </a>
            <a href="#">
              <img src="./assets/wallet.png" alt="" />
              <h5>Wallet</h5>
            </a>
            <a href="#">
              <img src="./assets/schedule.png" alt="" />
              <h5>Schedule</h5>
            </a>
            <hr />
            <a href="#">
              <img src="./assets/message.png" alt="" />
              <h5>Messages</h5>
            </a>
            <a href="#">
              <img src="./assets/support.png" alt="" />
              <h5>Support</h5>
            </a>
            <a href="#">
              <img src="./assets/settings.png" alt="" />
              <h5>Setting</h5>
            </a>
          </div>
        </div>

        {/* <!-- sidebar --> */}
      </aside>
    </>
  );
}

export default SideMenu;

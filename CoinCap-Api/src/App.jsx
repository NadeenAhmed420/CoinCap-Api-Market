import { useState } from "react";
import SideMenu from "../../Components/SideMenu/SideMenu";
import Header from "../../Components/Header/Header";
import Overview from "../../Components/Overview/Overview";
import Market from "../../Components/Market/Market";
import Converter from "../../Components/Converter/Converter";

export default function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <div className=" pb-4 px-0">
        <div className="row ">
          <div className="col-sm-2 col-md-1 col-lg-1 col-xl-2 ">
            <SideMenu isOpen={isSideMenuOpen} />
          </div>

          <div className="col-sm-10 col-md-11 col-lg-11 col-xl-10 g-0">
            <Header toggle={toggleSideMenu} />

            <div className="row  ">
              <div className="col-md-12 col-lg-8 col-xl-8 gx-lg-5 gx-5 pe-0 p-sm-0 ps-md-3">
                <Overview />
                <Market />
              </div>
              <div className="col-md-12 col-lg-4 col-xl-4 gx-5 pe-0 ">
                <Converter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

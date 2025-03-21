import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItems from "./navbarItems";
import { FaAngleDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import AccountMenu from "./accountMenu";


const TOP_OFFSET = 66

const Navbar = () => {
    const [showMobile, setshowMobile] = useState(false)
    const [showAccountMenu, setshowAccountMenu] = useState(false)
    const [showBackground, setshowBackground] = useState(false)
    const toggleMobileMenu = useCallback(() => {
        setshowMobile((current) => !current)
    },[])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setshowBackground(true) 
            } else {
                setshowBackground(false)
            }
        }
        window.addEventListener('scroll',handleScroll)
        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    },[])

    const toggleAccount = useCallback(() => {
      setshowAccountMenu((current) => !current);
    }, []);
  return (
    <nav className="w-full fixed z-30">
      <div className={`px-3 md:px-12 py-4 flex flex-row items-center transition duration-500  ${showBackground ? 'bg-zinc-900 bg-opacity-90':''}'`}>
        <img className="h-6 lg:h-10" src="/image/logo.png" alt="" />
        <div className="flex-row ml-8 gap-7 hidden md:flex">
          <NavbarItems label="Home" />
          <NavbarItems label="Series" />
          <NavbarItems label="Films" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My list" />
          <NavbarItems label="Browse by language" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <FaAngleDown
            className={`text-white transition ${
              showMobile ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobile} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 text-2xl hover:text-gray-300 cursor-pointer transition">
            <CiSearch />
          </div>
          <div className="text-gray-200 text-2xl hover:text-gray-300 cursor-pointer transition">
            <GoBell />
          </div>
          <div
            onClick={toggleAccount}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/image/avata.jpg" alt="" />
            </div>
            <FaAngleDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

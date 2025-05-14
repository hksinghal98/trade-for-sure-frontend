import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { BsBoxSeamFill } from 'react-icons/bs';
import { CiDeliveryTruck } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Menu } from 'lucide-react';

const NavLink = ({ to, icon: Icon, children, isActive, onClick }) => (
  <Link to={to} onClick={onClick} className="w-full">
    <div
      className={`hover:text-sky-500 cursor-pointer flex items-center gap-3 duration-500 p-2 rounded-md ${
        isActive ? 'bg-cyan-700 text-white' : ''
      }`}
    >
      {Icon && <Icon className="size-5" />}
      <span className="md:inline">{children}</span>
    </div>
  </Link>
);

const NavContent = ({ className = '' }) => {
  const [activeLink, setActiveLink] = useState('/home');
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [showDropdown2, setShowDropdown2] = useState(false); // State for dropdown visibility
  const [showDropdown3, setShowDropdown3] = useState(false); // State for dropdown visibility
  const location = useLocation();

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setShowDropdown(false); // Close dropdown when navigating
    setShowDropdown2(false); 
  };

  return (
    <div className={`flex flex-col items-center gap-9 text-base p-4 ${className}`}>
      <Link to="/">
        <img
          src="https://www.visualcinnamon.com/img/site/visual_cinnamon_logo_512.png"
          alt=""
          className="w-12"
        />
      </Link>
      <div className="w-full h-[2px] bg-[var(--color-border-subtle,#303034)]" />
      <NavLink
        to="/home"
        icon={MdDashboard}
        isActive={activeLink === '/home'}
        onClick={() => handleLinkClick('/home')}
      >
        <span className="md:inline">Market Watch</span>
      </NavLink>

      <div
        className={`hover:text-sky-500 cursor-pointer flex flex-col gap-2 duration-500 p-2 rounded-md w-full text-blue-500 ${
          location.pathname.startsWith('/') ? 'bg-transparent text-white' : ''
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer w-full"
          onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
        >
          <BsBoxSeamFill className="size-5" />
          <span className="md:inline">Order Punch Tool</span>
        </div>
        {showDropdown && (
          <div className="pl-8 flex flex-col gap-2">
            <NavLink
              to="/OrderPunch"
              isActive={location.pathname === '/OrderPunch'}
              onClick={() => handleLinkClick('/OrderPunch')}
            >
              Order Punch
            </NavLink>
            <NavLink
              to="/OrderStatus"
              isActive={location.pathname === '/OrderStatus'}
              onClick={() => handleLinkClick('/OrderStatus')}
            >
              Order Status
            </NavLink>
          </div>
        )}
      </div>
       <div
        className={`hover:text-sky-500 cursor-pointer flex flex-col gap-2 duration-500 p-2 rounded-md w-full text-blue-500 ${
          location.pathname.startsWith('/') ? 'bg-transparent text-white' : ''
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer w-full"
          onClick={() => setShowDropdown2(!showDropdown2)} // Toggle dropdown visibility
        >
          <BsBoxSeamFill className="size-5" />
          <span className="md:inline">Broker</span>
        </div>
        {showDropdown2 && (
          <div className="pl-8 flex flex-col gap-2">
            <NavLink
              to="/ViewBroker"
              isActive={location.pathname === '/ViewBroker'}
              onClick={() => handleLinkClick('/ViewBroker')}
            >
              Shoonya
            </NavLink>
             <NavLink
              to="/ViewAngel"
              isActive={location.pathname === '/ViewAngel'}
              onClick={() => handleLinkClick('/ViewAngel')}
            >
              Angel
            </NavLink>
            
            <NavLink
              to="/Settings"
              isActive={location.pathname === '/Settings'}
              onClick={() => handleLinkClick('/Settings')}
            >
              View/Edit Account Detail 
            </NavLink>
          </div>
        )}
      </div>
      <NavLink
        to="/Instrument"
        icon={CiDeliveryTruck}
        isActive={activeLink === '/Instrument'}
        onClick={() => handleLinkClick('/Instrument')}
      >Instrument</NavLink>
    </div>
  );
};

const ColNav = () => {
  return (
    <div className="flex">
      {/* Desktop Navigation */}
      <div className="hidden tablet-md:flex flex-col justify-between h-screen w-16 md:w-60">
        <NavContent />
        <div className="flex flex-col md:flex-row justify-evenly text-blue-500 p-7 gap-4 items-center">
          <IoIosLogOut className="size-7 cursor-pointer text-white hover:text-cyan-500 duration-500" />
          <Button className="hidden md:flex text-lg hover:text-cyan-500 cursor-pointer items-center gap-3 duration-500">
            LogOut
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="tablet-md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black text-white">
          <NavContent className="w-full" />
          <div className="flex justify-center mt-8">
            <Button className="text-lg hover:text-cyan-500 cursor-pointer flex items-center gap-3 duration-500">
              LogOut
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ColNav;
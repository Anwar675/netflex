import React from "react"


interface NavbaritemsProps {
  label: string;
}
const NavbarItems: React.FC<NavbaritemsProps> = ({label}) => {

  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItems;

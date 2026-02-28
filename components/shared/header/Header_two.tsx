import React from "react";
import { menuItems } from "@/data/data";
import Sidebar_two from "../sidebar/Sidebar_two";

const Header_two = () => {
  return (
    <div>
      <Sidebar_two
        sections={menuItems}
        position="right"
        hideOnDesk
        toggleDesk
        toggleDeskNavBar
        toggleDeskBtnPosition="top-right"
        overlayClickClose
        overlayOpacity={2}
      />
    </div>
  );
};

export default Header_two;

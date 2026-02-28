"use client";
import React from "react";
import { menuItems } from "@/data/data";
import Sidebar_one from "../sidebar/Sidebar_one";

const Header_one = () => {
  return (
    <div>
      <Sidebar_one
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

export default Header_one;

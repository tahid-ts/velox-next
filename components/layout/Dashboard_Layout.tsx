// "use client";
// import React, { useState } from "react";
// import { DashBoardMenuItems } from "@/data/data";
// import Dashboard_Sidebar from "../shared/sidebar/Dashboard_Sidebar";
// import Dashboard_Header from "../shared/header/Dashboard_Header";

// export interface Dashboard_LayoutProps {
//   children: React.ReactNode;
// }

// const Dashboard_Layout = ({ children }: Dashboard_LayoutProps) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const sidebarWidth = collapsed ? "6.5rem" : "18rem";

//   return (
//     <div className="flex min-h-screen bg-artboard">
//       <Dashboard_Sidebar
//         sections={DashBoardMenuItems}
//         position="left"
//         variant="default"
//         collapsible
//         collapsed={collapsed}
//         collapseTogglePosition="bottom"
//         collapseToggleClassName="hidden"
//         overlayClickClose
//         className="m-5 rounded-lg"
//         overlayOpacity={0.2}
//         onCollapseChange={setCollapsed}
//       />

//       <div
//         className="flex-1 p-5 transition-all duration-300"
//         style={{ marginLeft: sidebarWidth }}
//       >
//         <Dashboard_Header sidebar={collapsed} setSidebar={setCollapsed} />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Dashboard_Layout;

"use client";
import React, { useState } from "react";
import { DashBoardMenuItems } from "@/data/data";
import Dashboard_Sidebar from "../shared/sidebar/Dashboard_Sidebar";
import Dashboard_Header from "../shared/header/Dashboard_Header";

export interface Dashboard_LayoutProps {
  children: React.ReactNode;
}

const Dashboard_Layout = ({ children }: Dashboard_LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-artboard">
      <Dashboard_Sidebar
        sections={DashBoardMenuItems}
        position="left"
        variant="default"
        collapsible
        collapsed={collapsed}
        collapseTogglePosition="bottom"
        collapseToggleClassName="hidden"
        overlayClickClose
        className="lg:m-5 rounded-lg"
        overlayOpacity={0.2}
        onCollapseChange={setCollapsed}
      />

      <div
        className={`flex-1 p-5  transition-all duration-300
          ${collapsed ? "lg:ml-26" : "lg:ml-72"}
        `}
      >
        <Dashboard_Header sidebar={collapsed} setSidebar={setCollapsed} />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard_Layout;

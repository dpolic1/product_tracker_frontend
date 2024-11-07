import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex max-w-[1800px] mx-auto">
      <Sidebar />
      <main className="grow-1 overflow-y-auto pl-56">
        <Outlet />
      </main>
    </div>
  );
}
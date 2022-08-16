import React, { useState } from "react";
import {
  Button,
  Table,
  Checkbox,
  Mask,
  Badge,
  Tabs,
  Steps,
} from "react-daisyui";

function App() {
  return (
    <div className="overflow-x-auto">
      <div className="block m-auto">
        <h3>Data Table</h3>
      </div>
      <table className="bg-white rounded h-80 m-auto max-w-xs w-full p-1 shadow-md">
        <thead>
          <tr>
            <th className="text-gray-100 text-left bg-gray-900 border-b-4 border-r text-2xl font-thin p-4 text-left align-middle rounded-tl-md w-40">
              Month
            </th>
            <th className="text-gray-100 text-left bg-gray-900 border-b-4 text-2xl font-thin p-4 text-left align-middle rounded-tr-md w-40">
              Sales
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-b bg-gray-200 text-base text-gray-600 font-normal border-gray-50 box-border hover:bg-gray-900 hover:text-white">
            <td className="text-left border-r border-gray-50">January</td>
            <td className="text-left">$ 50,000.00</td>
          </tr>
          <tr className="border-t border-b bg-gray-200 text-base text-gray-600 font-normal border-gray-50 box-border hover:bg-gray-900 hover:text-white">
            <td className="text-left border-r border-gray-50">February</td>
            <td className="text-left">$ 10,000.00</td>
          </tr>
          <tr className="border-t border-b bg-gray-200 text-base text-gray-600 font-normal border-gray-50 box-border hover:bg-gray-900 hover:text-white">
            <td className="text-left border-r border-gray-50">March</td>
            <td className="text-left">$ 85,000.00</td>
          </tr>
          <tr className="border-t border-b bg-gray-200 text-base text-gray-600 font-normal border-gray-50 box-border hover:bg-gray-900 hover:text-white">
            <td className="text-left border-r border-gray-50">April</td>
            <td className="text-left">$ 56,000.00</td>
          </tr>
          <tr className="border-t border-b bg-gray-200 text-base text-gray-600 font-normal border-gray-50 box-border hover:bg-gray-900 hover:text-white">
            <td className="text-left border-r border-gray-50">May</td>
            <td className="text-left">$ 98,000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

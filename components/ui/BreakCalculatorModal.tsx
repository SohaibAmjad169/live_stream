
"use client";

import React, { useState } from "react";
import { X, Plus, Minus, Search } from "lucide-react";

interface BreakCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const productsData = [
  { name: "Football Hobby Box", price: 25, quantity: 400 },
  { name: "Shirt", price: 15, quantity: 200 },
  { name: "Football Hobby Box", price: 25, quantity: 300 },
  { name: "Baseball Card Pack", price: 12, quantity: 150 },
  { name: "Basketball Jersey", price: 35, quantity: 100 },
  { name: "Hockey Puck Set", price: 18, quantity: 250 },
  { name: "Tennis Racket", price: 45, quantity: 75 },
  { name: "Golf Ball Set", price: 22, quantity: 180 },
  { name: "Soccer Cleats", price: 65, quantity: 90 },
  { name: "Swimming Goggles", price: 28, quantity: 140 },
  { name: "Training Cone Set", price: 30, quantity: 60 },
  { name: "Compression Shorts", price: 20, quantity: 130 },
  { name: "Wristbands (Pack of 3)", price: 10, quantity: 220 },
  { name: "Yoga Mat", price: 40, quantity: 80 },
  { name: "Duffle Bag", price: 55, quantity: 50 },
];

export default function BreakCalculatorModal({
  isOpen,
  onClose,
}: BreakCalculatorModalProps) {
  const [quantities, setQuantities] = useState(productsData.map(() => 0));
  const [noOfSpots, setNoOfSpots] = useState("");
  const [costPerSpot, setCostPerSpot] = useState("");
  const [profitMargin, setProfitMargin] = useState("");

  const handleIncrement = (index: number) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const handleDecrement = (index: number) => {
    const updated = [...quantities];
    if (updated[index] > 0) updated[index]--;
    setQuantities(updated);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
            transition: background 0.2s ease;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
        `}
      </style>

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-2 sm:p-4">
        <div className="bg-white w-full max-w-5xl h-[95vh] rounded-xl sm:rounded-2xl p-3 sm:p-6 relative shadow-lg overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center z-10"
          >
            <X size={16} />
          </button>

          {/* Title */}
          <h2 className="text-[#0B0B58] text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 pr-10">
            Break Calculator
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-auto lg:h-[85%]">
            {/* LEFT SIDE */}
            <div className="flex-1">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block font-semibold text-[#000000] mb-1 text-sm">
                    No. of spots
                  </label>
                  <input
                    type="text"
                    placeholder="Enter no."
                    value={noOfSpots}
                    onChange={(e) => setNoOfSpots(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#000000] mb-1 text-sm">
                    Cost per spot
                  </label>
                  <input
                    type="text"
                    placeholder="Enter price($)"
                    value={costPerSpot}
                    onChange={(e) => setCostPerSpot(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] text-sm"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block font-semibold text-[#000000] mb-1 text-sm">
                    Profit Margin
                  </label>
                  <input
                    type="text"
                    placeholder="e.g 20%"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] text-sm"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block font-semibold text-[#000000] mb-1 text-sm">
                    Streaming Platform
                  </label>
                  <select className="w-full px-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] text-[#737791] text-sm">
                    <option>Select here</option>
                    <option>Twitch</option>
                    <option>YouTube</option>
                    <option>Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#000000] mb-1 text-sm">
                    Select Products to add
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search product here..."
                      className="w-full pl-10 pr-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000] text-sm"
                    />
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]"
                    />
                  </div>
                </div>
              </div>

              {/* Product Table - Desktop */}
              <div className="hidden md:block border border-[#E5E7EB] rounded-lg overflow-hidden">
                <div className="bg-white border-b border-[#F0F0F0] px-4 py-3 grid grid-cols-4 text-sm font-semibold text-[#1E3A8A] uppercase">
                  <div>SELECT (QTY)</div>
                  <div>ITEM</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                </div>
                <div className="max-h-54 overflow-y-auto divide-y divide-[#E5E7EB] custom-scrollbar">
                  {productsData.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 grid grid-cols-4 items-center hover:bg-[#F8F9FA] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          className="w-7 h-7 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#172D6E] transition-colors"
                          onClick={() => handleDecrement(i)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#19191D]">
                          {quantities[i]}
                        </span>
                        <button
                          className="w-7 h-7 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#172D6E] transition-colors"
                          onClick={() => handleIncrement(i)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm text-[#19191D]">{item.name}</div>
                      <div className="text-sm text-[#19191D]">${item.price}</div>
                      <div className="text-sm text-[#19191D]">{item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Cards - Mobile */}
              <div className="md:hidden space-y-3">
                <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-3">
                  {productsData.map((item, i) => (
                    <div
                      key={i}
                      className="border border-[#E5E7EB] rounded-lg p-3 bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[#19191D]">{item.name}</h4>
                          <div className="flex gap-4 text-xs text-[#6B7280] mt-1">
                            <span>Price: ${item.price}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="w-6 h-6 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#172D6E] transition-colors"
                            onClick={() => handleDecrement(i)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-[#19191D]">
                            {quantities[i]}
                          </span>
                          <button
                            className="w-6 h-6 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-[#172D6E] transition-colors"
                            onClick={() => handleIncrement(i)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-60 flex flex-col gap-4 mt-4 lg:mt-0">
              <div className="border border-[#C3D3E2] h-auto lg:h-full bg-[#F9FAFB] rounded-xl p-4 sm:p-5">
                <p className="text-[#D08E10] text-sm mb-4">
                  *Select all the values from the left and press the &quot;Calculate&quot;
                  button
                </p>
                <h4 className="text-[#1E3A8A] font-semibold text-base mb-3">
                  Calculated Results:
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#000000]">
                    Recommended Price:
                  </span>
                  <span className="font-bold text-lg text-[#1E3A8A]">$80</span>
                </div>
                <p className="text-xs text-[#1E3A8A] leading-relaxed mt-2">
                  *This price includes all costs, fees, and your profit margin
                </p>
              </div>

              <button className="w-full bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg hover:bg-[#172D6E] transition">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

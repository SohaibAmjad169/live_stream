"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  selected: boolean;
  quantity: number;
}

interface CreateDirectSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDirectSaleModal({
  isOpen,
  onClose,
}: CreateDirectSaleModalProps) {
  const [buyerName, setBuyerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Football Hobby Box", price: 25, selected: true, quantity: 400 },
    { id: 2, name: "Shirt", price: 15, selected: false, quantity: 200 },
    { id: 3, name: "Football Hobby Box", price: 25, selected: false, quantity: 300 },
    { id: 4, name: "Baseball Cap", price: 10, selected: false, quantity: 150 },
    { id: 5, name: "Basketball Jersey", price: 40, selected: false, quantity: 80 },
    { id: 6, name: "Sneakers", price: 70, selected: false, quantity: 60 },
    { id: 7, name: "Wristband Set", price: 5, selected: false, quantity: 500 },
    { id: 8, name: "Hockey Stick", price: 90, selected: false, quantity: 30 },
    { id: 9, name: "Cricket Bat", price: 65, selected: false, quantity: 45 },
    { id: 10, name: "Yoga Mat", price: 20, selected: false, quantity: 120 },
    { id: 11, name: "Water Bottle", price: 12, selected: false, quantity: 250 },
    { id: 12, name: "Duffle Bag", price: 35, selected: false, quantity: 90 },
    { id: 13, name: "Socks Pack", price: 8, selected: false, quantity: 300 },
    { id: 14, name: "Tennis Racket", price: 85, selected: false, quantity: 25 },
    { id: 15, name: "Gloves", price: 18, selected: false, quantity: 100 },
  ]);

  const selectedProducts = products.filter((p) => p.selected);
  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const platformFee = subtotal * 0.1;
  const estimatedProfit = subtotal - platformFee;

  const toggleProductSelection = (id: number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-4xl h-[95vh] rounded-2xl p-6 relative shadow-lg overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center"
          >
            <X size={16} />
          </button>

          {/* Title */}
          <h2 className="text-[#0B0B58] text-xl sm:text-2xl font-bold mb-6">
            Create Direct Sale
          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Section - Form */}
            <div className="xl:col-span-2 space-y-6">
              {/* Buyer Name & Search Row */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Buyer Name */}
                <div className="flex-1 md:w-1/2">
                  <label className="block font-semibold text-[#000000] mb-1">
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
                  />
                </div>

                {/* Search Product */}
                <div className="flex-2 md:w-1/2">
                  <label className="block font-semibold text-[#000000] mb-1">
                    Select Products to add
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search product here..."
                      className="w-full pl-10 pr-3 py-2 border border-[#C3D3E2] bg-[#F9FAFB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
                    />
                  </div>
                </div>
              </div>

              {/* Product Table */}
              <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                <div className="bg-white border-b border-[#F0F0F0] px-4 py-3 grid grid-cols-4 text-sm font-semibold text-[#1E3A8A] uppercase">
                  <div>SELECT</div>
                  <div>ITEM</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E7EB] custom-scrollbar">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => toggleProductSelection(product.id)}
                      className="px-4 py-3 grid grid-cols-4 items-center hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                    >
                      <div>
                        <input
                          type="checkbox"
                          onClick={(e) => e.stopPropagation()}
                          checked={product.selected}
                          onChange={() => toggleProductSelection(product.id)}
                          className="w-4 h-4 text-[#1E3A8A] bg-gray-100 border-gray-300 rounded focus:ring-[#1E3A8A] focus:ring-2"
                        />
                      </div>
                      <div className="text-sm text-[#19191D]">{product.name}</div>
                      <div className="text-sm text-[#19191D]">${product.price}</div>
                      <div className="text-sm text-[#19191D]">{product.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Summary */}
            <div className="flex flex-col h-full justify-between bg-[#F9FAFB] border border-[#C3D3E2] rounded-lg p-4">
              <div>
                <h3 className="text-[#1E3A8A] font-semibold text-lg mb-4">
                  Break Sale Summary
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#000000]">Products Selected</span>
                    <span className="font-semibold text-[#000000]">
                      {selectedProducts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000]">Subtotal</span>
                    <span className="font-semibold text-[#000000]">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000]">Platform Fee(10%)</span>
                    <span className="font-semibold text-[#000000]">
                      ${platformFee.toFixed(0)}
                    </span>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-3 flex justify-between">
                    <span className="text-[#000000]">Estimated Profit</span>
                    <span className="font-semibold text-[#000000]">
                      ${estimatedProfit.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  console.log({
                    buyerName,
                    selectedProducts,
                    subtotal,
                    platformFee,
                    estimatedProfit,
                  });
                  onClose();
                }}
                className="w-full bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg hover:bg-[#172D6E] transition mt-6"
              >
                Create Break
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

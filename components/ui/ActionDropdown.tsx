"use client";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

interface ActionDropdownProps {
  items: string[];
  onSelect?: (item: string) => void;
}

export default function ActionDropdown({ items, onSelect }: ActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null); // ✅ new ref for dropdown

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 150, // adjust for width
      });
    }
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="text-xl font-bold px-2 focus:outline-none"
      >
        ...
      </button>

      {open &&
        ReactDOM.createPortal(
          <div
            ref={menuRef} // ✅ bind the ref here
            className="absolute w-45 border-[#C3D3E2] bg-white shadow-lg z-[9999]"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              position: "absolute",
            }}
          >
            <ul className="divide-y text-base">
              {items.map((label, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    onSelect?.(label);
                    setOpen(false);
                  }}
                  className="px-4 py-3 bg-white hover:bg-[#00000006] border-[#C3D3E2] cursor-pointer"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
}

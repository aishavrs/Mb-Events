import React, { useState, useRef, useEffect } from "react";

export default function DropdownFilter({ label, options, selected, setSelected, showSelectAll = true }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (option === "Select All") {
      if (selected.length === options.length) {
        setSelected([]);
      } else {
        setSelected([...options]);
      }
    } else {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center bg-white border border-gray-300 rounded-md text-xs px-3 py-2 w-36 text-gray-700 hover:bg-gray-50"
      >
        <span>{label}</span>
        <span className="text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-md mt-1 w-36 max-h-48 overflow-y-auto">
          {/* ✅ Only show Select All if allowed */}
          {showSelectAll && (
            <label className="flex items-center px-2 py-1 text-xs cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selected.length === options.length}
                onChange={() => toggleOption("Select All")}
                className="mr-2"
              />
              Select All
            </label>
          )}

          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-2 py-1 text-xs cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

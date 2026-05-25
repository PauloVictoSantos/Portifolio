"use client";

import { useState } from "react";

export function Browser() {
  const [url, setUrl] = useState("Paulo Victor");
  const [starred, setStarred] = useState(false);

  return (
    <div
      className="
        relative flex w-65.75 flex-col overflow-hidden
        bg-[#d3d3d3]
      "
      style={{ height: 144 }}
    >

      <div className="flex h-5 items-end justify-between bg-[#353535] pl-4">

        <div className="flex items-end">
          <div
            className="
              relative flex h-4 w-18
              items-center justify-between
              rounded-t-[6px]
              bg-[#515151]
              px-1.5
            "
          >
            {/* LEFT CURVE */}
            <div className="absolute left-0 top-0 h-4 w-4 -translate-x-full overflow-hidden bg-[#515151]">
              <div className="h-full w-full rounded-br-[6px] bg-[#353535]" />
            </div>

            {/* TITLE */}
            <span className="truncate text-[8px] ">
              Paulo
            </span>

            {/* CLOSE TAB */}
            <button
              className="
                flex h-3 w-3 items-center justify-center
                rounded-sm text-[7px]
                transition-colors duration-150
                hover:bg-[#5d5d5d]
              "
            >
              ✕
            </button>

            {/* RIGHT CURVE */}
            <div className="absolute right-0 top-0 h-4 w-4 translate-x-full overflow-hidden bg-[#515151]">
              <div className="h-full w-full rounded-bl-[6px] bg-[#353535]" />
            </div>
          </div>
        </div>

        {/* WINDOW BUTTONS */}
        <div className="mb-1 flex">
          {["−", "□"].map((icon) => (
            <button
              key={icon}
              className="
                flex h-5 w-7 items-center justify-center
                text-[9px] 
                transition-all duration-150
                hover:bg-[#515151c8]
              "
            >
              {icon}
            </button>
          ))}

          <button
            className="
              flex h-5 w-7 items-center justify-center
              text-[9px] 
              transition-all duration-150
              hover:bg-red-500
            "
          >
            ✕
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className="
          absolute top-3.5 z-10
          flex h-9 w-full items-center gap-1
          rounded-t-[7px]
          bg-[#515151]
          px-2
        "
      >
        {/* BACK */}
        <button
          className="
            flex h-5 w-5 items-center justify-center
            rounded-md text-[11px] 
            transition-colors duration-200
            hover:bg-[#5d5d5d]
          "
        >
          ←
        </button>

        {/* FORWARD */}
        <button
          disabled
          className="
            flex h-5 w-5 items-center justify-center
            rounded-md text-[11px] 
            opacity-40 disabled:cursor-default
          "
        >
          →
        </button>

        {/* SEARCH BAR */}
        <div className="relative flex flex-1 items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search Google or type URL"
            className="
              h-5 w-full flex-1 rounded-full
              border border-transparent
              bg-[#3b3b3b]
              px-3 pr-7
              text-[10px] 
              outline-none
              placeholder:
              transition-[background-color,border-color]
              duration-200
              hover:bg-[#5d5d5d]
              focus:border-[rgb(173,214,255)]
              focus:bg-[#3b3b3b]
            "
          />

          {/* STAR */}
          <button
            onClick={() => setStarred((s) => !s)}
            className={`
              absolute right-1
              flex h-4 w-4 items-center justify-center
              rounded-sm
              text-[10px]
              transition-colors duration-200
              hover:bg-[#5d5d5d]
              ${
                starred
                  ? "text-yellow-400"
                  : " opacity-70"
              }
            `}
          >
            {starred ? "★" : "✰"}
          </button>
        </div>

        {/* MENU */}
        <button
          className="
            flex h-5 w-5 items-center justify-center
            rounded-md text-[11px] 
            transition-colors duration-200
            hover:bg-[#5d5d5d]
          "
        >
          ⋮
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-16 flex-1 bg-[#d3d3d3]" />
    </div>
  );
}
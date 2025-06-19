import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

import Badge from "src/components/common/badge";
interface ShipmentTabHeadersProps {
  active: number;
  pending: number;
  finished: number;
  all: number;
}

const ShipmentTabHeaders: React.FC<ShipmentTabHeadersProps> = ({ pending, active, finished, all }) => {
  return (
    <>
      {/* horizontal scroll for small screens */}
      <div className="w-full overflow-x-auto"> 

        {/* Made layout responsive:vertical on mobile, horizontal on sm+ */}
      <div className="flex flex-col sm:flex-row w-max sm:w-full rounded-[4px]">

        {/* ==== "All" Tab ==== */}
        <Tab
          className={({ selected }) =>
            classNames(
              "rounded-tl-[4px] sm:rounded-bl-[4px] sm:rounded-tl-[4px] border-y sm:border-y border-l border-r sm:border-l border-tm-black-20 px-4 py-2 sm:px-[20px] sm:py-[10px] text-sm sm:text-[16px] uppercase leading-[1.2em] outline-none", // Responsive paddings, text size  px-[20px] py-[10px] text-[16px] uppercase leading-[1.2em] outline-none",
              {
                "!border-tm-black-80 bg-tm-black-80 font-bold text-tm-white": selected
              },
            )
          }
        >
          <div className="flex items-center justify-between sm:gap-[10px]">
            <p className="text-[12px] font-bold uppercase">All</p>
            <span className="text-[12px] font-semibold">{all}</span>
          </div>
        </Tab>

        {/* ==== Active Shipments Tab ==== */}
        <Tab
          className={({ selected }) =>
            classNames(
              "border sm:border-y sm:border-l border-tm-black-20 px-4 py-2 sm:px-[20px] sm:py-[10px] text-sm sm:text-[16px] uppercase leading-[1.2em] outline-none",
              {
                 "!border-tm-black-80 bg-tm-black-80 font-bold text-tm-white": selected,
              },
            )
          }
        >
          <div className="flex items-center justify-between sm:gap-[10px]">
            <div className="flex items-center gap-[10px]">
              {/* <Badge background="bg-tm-purple" /> */}
              <p className="text-[12px] font-bold uppercase">Active Shipments</p>
              <span className="text-[12px] font-semibold">{active}</span>
            </div>
          </div>
        </Tab>


        {/* ==== Pending Tab ==== */}
        <Tab
          className={({ selected }) =>
            classNames(
              "border sm:border-y sm:border-l border-tm-black-20 px-4 py-2 sm:px-[20px] sm:py-[10px] text-sm sm:text-[16px] leading-[1.2em] outline-none",
              {
                "!border-tm-black-80 bg-tm-black-80 font-bold text-tm-white": selected,
              },
            )
          }
        >

          <div className="flex items-center justify-between sm:gap-[16px]">
            <p className="text-[12px] font-bold">PENDING</p>
            <span className="text-[12px] font-semibold">{pending}</span>
          </div>
        </Tab>

        
        {/* ==== Finished Tab ==== */}
        <Tab
          className={({ selected }) =>
            classNames(
              "rounded-br-[0px] sm:rounded-br-[4px] sm:rounded-tr-[4px] border-y sm:border-y border-r border-l sm:border-r border-tm-black-20 px-4 py-2 sm:px-[20px] sm:py-[10px] text-sm sm:text-[16px] uppercase leading-[1.2em] outline-none",
              {
                "bg-tm-black-80 font-bold text-tm-white": selected,
              },
            )
          }
        >
          <div className="flex items-center justify-between sm:gap-[16px]">
            <p className="text-[12px] font-bold">Finished</p>
            <span className="text-[12px] font-semibold">{finished}</span>
          </div>
        </Tab>
      </div>

      </div>
    </>
  );
};

export default ShipmentTabHeaders;

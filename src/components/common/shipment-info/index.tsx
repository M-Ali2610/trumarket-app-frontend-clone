import classNames from "classnames";
import React from "react";
import Flag from "react-world-flags";
interface ShipmentInfoProps {
  title: string;
  value: string;
  showFlag?: boolean;
  subValue?: string;
  titleClassOverrides?: string;
  valueClassOverrides?: string;
  countryCode?: string;
}

const ShipmentInfo: React.FC<ShipmentInfoProps> = ({
  title,
  value,
  subValue,
  titleClassOverrides,
  valueClassOverrides,
  countryCode,
  showFlag = false,
}) => {
  return (
    <div className="flex w-auto flex-col gap-1 sm:gap-[5px] min-w-0">

      {/* Title */}
      <p className={classNames("sm:text-[13px] text-xs font-bold capitalize leading-[1em] text-tm-black-80 truncate", titleClassOverrides)}>
        {title}
      </p>

      {/* Flag + Value + SubValue */}
      <div className={classNames("flex flex-wrap items-center gap-2 sm:gap-[6px] min-w-0 text-xs sm:text-sm", valueClassOverrides)}>
        {showFlag ? (
          <div className="w-[24px] sm:w-[30px] rounded-[4px] shrink-0">
            <Flag code={countryCode} className="h-[18px] sm:h-[20px] rounded-[4px]" />
          </div>
        ) : null}
        <span suppressHydrationWarning className="text-tm-black-80 truncate">
          {value}
        </span>
        <span suppressHydrationWarning className="text-tm-black-80 opacity-60 truncate">
          {subValue}
        </span>
      </div>
    </div>
  );
};

export default ShipmentInfo;

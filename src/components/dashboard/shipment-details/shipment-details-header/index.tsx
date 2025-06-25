import { CheckCircle } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { AccountTypeEnum } from "src/interfaces/global";

interface ShipmentDetailsHeaderProps {
  productName?: string;
  shipmentNumber?: string;
  publish: () => void;
  isPublished?: boolean;
  userAccountType: string;
}

const ShipmentDetailsHeader: React.FC<ShipmentDetailsHeaderProps> = ({
  productName,
  shipmentNumber,
  publish,
  isPublished,
  userAccountType,
}) => {
  const [publishEnabled, setPublishEnabled] = React.useState(false);

  useEffect(() => {
    // const key = localStorage.getItem("publishEnabled");
    // if (key) {
    setPublishEnabled(true);
    // }
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-[30px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-[15px]">
        <h1 className="text-xl sm:text-[26px] font-bold leading-[1.2em] text-tm-black-80">{productName}</h1>
        {/* <p className="font-light">#{shipmentNumber}</p> */}
        {publishEnabled &&
          userAccountType === AccountTypeEnum.BUYER &&
          (isPublished ? (
            <p className="flex items-center text-sm font-light text-tm-green">
              Published
              <span className="ml-2">
                <CheckCircle size={16} />
              </span>
            </p>
          ) : (
            <button
              onClick={() => {
                publish();
              }}
              className="rounded-md bg-tm-green px-2 py-1 text-sm text-tm-white"
            >
              Publish
            </button>
          ))}
      </div>
    </div>
  );
};

export default ShipmentDetailsHeader;

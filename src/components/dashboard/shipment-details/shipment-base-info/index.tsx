import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

import InformationRow from "src/components/common/information-row";
import { AccountTypeEnum } from "src/interfaces/global";
import { CurrencyFormatter, truncateContractAddress } from "src/lib/helpers";
import InformationRowDivider from "src/components/common/information-row/information-row-divider";
import MuiTooltip from "src/components/common/mui-tooltip";
import { AgreementPartyInfo } from "src/interfaces/shipment";
interface ShipmentBaseInfoProps {
  accountType: AccountTypeEnum;
  emailInfo?: AgreementPartyInfo[];
  value: number;
  identifier: string;
  handleShowAgreement: () => void;
}

const ShipmentBaseInfo: React.FC<ShipmentBaseInfoProps> = ({
  accountType,
  emailInfo,
  value,
  identifier,
  handleShowAgreement,
}) => {
  const isBuyer = accountType === AccountTypeEnum.BUYER;
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-y-3 gap-x-4 rounded-[4px] border border-tm-black-20 bg-[#ffffff80] px-4 py-3 sm:px-[26px] sm:py-[14px]">
        <InformationRow
          label={isBuyer ? "Supplier:" : "Buyer:"}
          value={
            <MuiTooltip
              titleHidden={emailInfo?.length === 1}
              tooltipText={emailInfo
                ?.slice(1)
                .map((user) => user.email)
                .join("\n")}
            >
              {emailInfo?.length ? (
                <p>{`${emailInfo[0].email} ${emailInfo.length > 1 ? `and ${emailInfo!.length! - 1} other` : ""}`}</p>
              ) : (
                <></>
              )}
            </MuiTooltip>
          }
          underlined={false}
          showBoldValue={false}
          containerClassOverrides="py-[4px]"
        />
        <InformationRowDivider classOverrides="hidden sm:block h-[30px]" />
        <InformationRow
          underlined={false}
          label="Value:"
          value={CurrencyFormatter(value)}
          showBoldValue={false}
          containerClassOverrides="py-[4px]"
        />
        <InformationRowDivider classOverrides="hidden sm:block h-[30px]" />
        <InformationRow
          label="Identifier:"
          value={`#${identifier}`}
          underlined={false}
          showBoldValue={false}
          containerClassOverrides="py-[10px]"
        />
        <InformationRowDivider classOverrides="h-[30px]" />

        <div onClick={handleShowAgreement} className="flex items-center gap-[4px] cursor-pointer">
          <p className="text-[13px] font-medium capitalize leading-[1em] text-tm-black-80">Show Agreement</p>
          <LaunchIcon className="!h-[18px]" />
        </div>
      </div>
    </div>
  );
};

export default ShipmentBaseInfo;

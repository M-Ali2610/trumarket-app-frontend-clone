import React, { useEffect, useState } from "react";

import InformationRow from "src/components/common/information-row";
import InformationRowDivider from "src/components/common/information-row/information-row-divider";
import { AccountTypeEnum, ITransportType } from "src/interfaces/global";
import { CurrencyFormatter } from "src/lib/helpers";
import { useAppDispatch, useAppSelector } from "src/lib/hooks";
import { useUserInfo } from "src/lib/hooks/useUserInfo";
import {
  cloneShipmentAgreementState,
  resetShipmentAgreementState,
  selectShipmentAgreementState,
} from "src/store/createShipmentAgreementSlice";

import EnterAddressee from "./enter-addressee";
import OriginAndDestination from "./origin-and-destination";
import PaymentValues from "./payment-values";
import ProductDetails from "./product-details";
import VerticalLinearStepper from "./stepper/stepper";
import SubmitAgreement from "./submit-agreement";
import CompanyData from "./company-data";
import { ShipmentService } from "src/controller/ShipmentAPI.service";

interface CreateShipment {}

const CreateShipment: React.FC<CreateShipment> = () => {

  // comment when pushing to main
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shipmentFormData: any = useAppSelector(selectShipmentAgreementState);
  const { accountType: originalAccountType } = useUserInfo();
  const accountType = originalAccountType || AccountTypeEnum.BUYER; // ✅ fallback for no login
  const isBuyer = accountType === AccountTypeEnum.BUYER;
  const [steps, setSteps] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  // uncomment when pushing to main
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const shipmentFormData: any = useAppSelector(selectShipmentAgreementState);
  // const { accountType } = useUserInfo();
  // const isBuyer = accountType === AccountTypeEnum.BUYER;
  // const [steps, setSteps] = useState<any[]>([]);
  // const dispatch = useAppDispatch();

  const loadSteps = () => {
    setSteps([
      {
        label: "Product",
        subLabel: (
          <p>
            What do you want <br /> {isBuyer ? "to buy" : "to sell"}?
          </p>
              ),
              nodeToRender: (
          <div className="flex flex-col items-center sm:items-start sm:flex-row w-full">
            <div className="w-full sm:w-auto">
              <ProductDetails setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
            </div>
          </div>
        ),
        filledValues: (
          <div className="flex flex-wrap justify-center sm:justify-start">
            <InformationRow label="Product:" underlined={false} value={shipmentFormData.name} />
            <InformationRowDivider />
            <InformationRow label="Variety:" underlined={false} value={shipmentFormData.variety} />
            <InformationRowDivider />
            <InformationRow label="Quality:" underlined={false} value={shipmentFormData.quality?.label} />
            <InformationRowDivider />
            <InformationRow label="Presentation:" underlined={false} value={shipmentFormData.presentation} />
          </div>
        ),
      },
      {
        label: "Values",
        subLabel: (
          <p>
            The value of the <br /> agreement
          </p>
        ),
        nodeToRender: (
          <PaymentValues isBuyer={isBuyer} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
        ),
        filledValues: (
          <div className="flex">
            <InformationRow label="Amount:" underlined={false} value={shipmentFormData.quantity} />
            <InformationRowDivider />
            <InformationRow
              label="Price:"
              underlined={false}
              value={CurrencyFormatter(shipmentFormData.offerUnitPrice)}
            />
            <InformationRowDivider />
            <InformationRow
              label="Total:"
              underlined={false}
              value={CurrencyFormatter(shipmentFormData.quantity * shipmentFormData.offerUnitPrice)}
            />
          </div>
        ),
      },
      {
        label: "Where and when",
        subLabel: (
          <p>
            Tell us about your <br /> timeline
          </p>
        ),
        nodeToRender: <OriginAndDestination setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />,
        filledValues: (
          <div className="flex">
            <InformationRow
              label="From:"
              underlined={false}
              value={`${shipmentFormData.port_origin},${shipmentFormData.origin?.label}`}
            />
            <InformationRowDivider />
            <InformationRow
              label="To:"
              underlined={false}
              value={`${shipmentFormData.port_destination},${shipmentFormData.destination?.label}`}
            />
            <InformationRowDivider />
            <InformationRow label="Date:" underlined={false} value={shipmentFormData.shippingStartDate} />
            <InformationRowDivider />
            <InformationRow
              label="Transport:"
              underlined={false}
              value={shipmentFormData.transport === ITransportType.BY_AIR ? "By Air" : "Sea Freight"}
            />
          </div>
        ),
      },
      {
        label: "Your Data",
        subLabel: (
          <p>
            Enter your company <br /> data
          </p>
        ),
        hint: (
          <span>
            All participants have to confirm this agreement. They will be authorized to manage the milestones. <br />
            <span>
              If any of the e-mails does not have an account in the platform, we will send him an e-mail invitation.
            </span>
          </span>
        ),
        nodeToRender: <CompanyData setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />,
        filledValues: (
          <div className="flex">
            <InformationRow label="Company Name:" underlined={false} value={`${shipmentFormData.companyName}`} />
            <InformationRowDivider />
            <InformationRow label="Country:" underlined={false} value={`${shipmentFormData.country?.label}`} />
            <InformationRowDivider />
            <InformationRow label="Tax ID:" underlined={false} value={shipmentFormData.taxId} />
            <InformationRowDivider />
            <InformationRow
              label="Participants:"
              underlined={false}
              value={shipmentFormData?.participants
                ?.map((participant: { label: string; value: string }) => participant.label)
                ?.join(", ")}
            />
          </div>
        ),
      },
      {
        label: isBuyer ? "Supplier" : "Buyer",
        subLabel: (
          <span>
            Enter the {isBuyer ? "supplier" : "buyer"}&apos;s <br /> company data
          </span>
        ),
        hint: `If the ${isBuyer ? "supplier" : "buyer"} doesn't have an account in the platform, we will send him an e-mail invitation.`,
        nodeToRender: (
          <EnterAddressee selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} accountType={accountType} />
        ),
        filledValues: (
          <div className="flex">
            <InformationRow
              label="Email address(es):"
              underlined={false}
              value={shipmentFormData?.addresseeParticipants
                ?.map((participant: { label: string; value: string }) => participant.label)
                ?.join(", ")}
            />
            <InformationRowDivider />
            <InformationRow
              label="Company Name"
              underlined={false}
              value={`${shipmentFormData.addresseeCompanyName}`}
            />
            <InformationRowDivider />
            <InformationRow label="Tax ID:" underlined={false} value={`${shipmentFormData.addresseeTaxId}`} />
            <InformationRowDivider />
            <InformationRow
              label="Country :"
              underlined={false}
              value={`${shipmentFormData.addresseeCountry?.label || ""}`}
            />
          </div>
        ),
      },
      {
        label: "Summary",
        subLabel: (
          <p>
            Review the form data and <br /> confirm the <br /> agreement
          </p>
        ),
        hint: "After your confirmation, the smart contract will be created and you will be able to track/manage the shipment.",
        nodeToRender: <SubmitAgreement selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />,
      },
    ]);
  };

  useEffect(() => {
    if (!accountType) {
      console.log("accountType:", accountType);
      console.log("steps loaded:", steps);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const cloneShipmentId = urlParams.get("cloneShipmentId");

    if (!cloneShipmentId) {
      dispatch(resetShipmentAgreementState());
      loadSteps();
      return;
    }

    ShipmentService.getShipmentDetails(cloneShipmentId as string).then(async (shipment) => {
      let companyData;
      let otherCompanyData;
      let companyParticipants: any[] = [];
      let otherCompanyParticipants: any[] = [];
      if (isBuyer) {
        companyData = shipment.buyerCompany;
        otherCompanyData = shipment.supplierCompany;
        companyParticipants = shipment.buyers.slice(1).map((p) => ({ label: p.email, value: p.email }));
        otherCompanyParticipants = shipment.suppliers.map((p) => ({ label: p.email, value: p.email }));
      } else {
        companyData = shipment.supplierCompany;
        otherCompanyData = shipment.buyerCompany;
        companyParticipants = shipment.suppliers.slice(1).map((p) => ({ label: p.email, value: p.email }));
        otherCompanyParticipants = shipment.buyers.map((p) => ({ label: p.email, value: p.email }));
      }

      dispatch(
        cloneShipmentAgreementState({
          shipment: {
            name: shipment.name,
            variety: shipment.variety,
            quality: { label: shipment.quality, value: shipment.quality } as any,
            presentation: shipment.presentation,
            quantity: "" + shipment.quantity,
            offerUnitPrice: "" + shipment.offerUnitPrice,
            shippingStartDate: shipment.shippingStartDate,
            transport: "" + shipment.transport,
            origin: { label: shipment.origin, value: shipment.origin } as any,
            destination: { label: shipment.destination, value: shipment.destination } as any,
            port_origin: "" + shipment.portOfOrigin,
            port_destination: "" + shipment.portOfDestination,
            production_and_fields: "" + shipment.milestones[0].fundsDistribution,
            packaging_and_process: "" + shipment.milestones[1].fundsDistribution,
            finished_product_and_storage: "" + shipment.milestones[2].fundsDistribution,
            transport_to_port_of_origin: "" + shipment.milestones[3].fundsDistribution,
            port_of_origin: "" + shipment.milestones[4].fundsDistribution,
            transit: "" + shipment.milestones[5].fundsDistribution,
            port_of_destination: "" + shipment.milestones[6].fundsDistribution,
            companyName: companyData.name,
            taxId: companyData.taxId,
            country: { label: companyData.country, value: companyData.country } as any,
            participants: companyParticipants as any,
            addresseeCompanyName: otherCompanyData.name,
            addresseeTaxId: otherCompanyData.taxId,
            addresseeCountry: { label: otherCompanyData.country, value: otherCompanyData.country } as any,
            addresseeParticipants: otherCompanyParticipants as any,
          },
        }),
      );

      setTimeout(() => {
        loadSteps();
      }, 0);
    });
  }, [accountType]);

  if (!steps.length) return <></>;

  return (
    <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
      <VerticalLinearStepper steps={steps} selectedIndex={selectedIndex} />
    </div>
  );
};

export default CreateShipment;

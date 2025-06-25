import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import { AirplaneTilt } from "@phosphor-icons/react";
import classNames from "classnames";
import * as React from "react";

import { IMilestoneDetails, ITransportType, MilestoneApprovalStatus, MilestoneEnum } from "src/interfaces/global";
import { milestones as MilestoneData } from "src/lib/static";

import { milestoneStatusFactory } from "./milestoneStausFactoryFn";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
    display: "flex",
    justifyContent: "center",
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: "2px",
    border: 0,
    width: "20px",
    backgroundColor: "#00000033",
    borderRadius: 1,
    top: "5px",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      right: "-9px",
      top: "-1px",
      transform: "translateY(-50%)",
      rotate: "270deg",
      width: 0,
      height: 0,
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid #00000033",
    },
  },
}));

function ColorlibStepIcon(
  props: StepIconProps & {
    milestoneStatus: MilestoneApprovalStatus;
    status: MilestoneEnum | undefined;
    icon: React.ReactElement;
    isBuyer: boolean;
    hasNewDocuments: boolean;
    prevMilestoneStatus: MilestoneApprovalStatus;
    nextMilestoneStatus: MilestoneApprovalStatus;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
  },
) {
  const {
    active,
    completed,
    className,
    icon,
    milestoneStatus,
    isBuyer,
    hasNewDocuments,
    prevMilestoneStatus,
    nextMilestoneStatus,
    setActive,
  } = props;

  const milestoneInfoRenderer = milestoneStatusFactory(
    isBuyer,
    nextMilestoneStatus,
    milestoneStatus,
    hasNewDocuments,
    active,
  );

  const IconWithStyle = React.cloneElement(icon, {
    className: classNames("opacity-30", milestoneInfoRenderer?.iconClass),
  });

  React.useEffect(() => {
    setActive(active!);
  }, [active]);

  return (
    <div className="relative">
      <div>
        <div
          className={classNames(
            "flex items-center justify-center gap-2 rounded-[4px] px-2 h-10 min-w-[70px] sm:min-w-[80px]",
            milestoneInfoRenderer?.containerClass,
          )}
        >
          {IconWithStyle}
          {milestoneInfoRenderer?.icon}
        </div>
      </div>
    </div>
  );
}

export default function HorizontalMilestones({
  status,
  milestones,
  isBuyer,
  hasNewDocuments,
  setActive,
  transport,
}: {
  status: MilestoneEnum | undefined;
  milestones: IMilestoneDetails[];
  isBuyer: boolean;
  hasNewDocuments: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  transport: ITransportType;
}) {
  return (
  <>
    {/* Mobile (Vertical Stepper) */}
    <div className="block sm:hidden w-full">
      <Stack spacing={3}>
        {MilestoneData.map((step, index) => {
          const statusIcon = milestoneStatusFactory(
            isBuyer,
            milestones[step.milestone + 1]?.approvalStatus,
            milestones[step.milestone]?.approvalStatus,
            hasNewDocuments,
            status === step.milestone
          );

          const IconWithStyle = React.cloneElement(
            step.milestone === MilestoneEnum.M5 && transport === ITransportType.BY_AIR
              ? <AirplaneTilt size={22} weight="duotone" />
              : step.icon,
            {
              className: classNames("opacity-30", statusIcon?.iconClass),
            }
          );

          return (
            <div key={index} className="flex items-center gap-3">
              <div className={classNames("flex items-center gap-2 px-2 py-2 rounded-md", statusIcon?.containerClass)}>
                {IconWithStyle}
                {statusIcon?.icon}
              </div>
              <p className="text-sm font-medium text-tm-black-80">{step.label}</p>
            </div>
          );
        })}
      </Stack>
    </div>

    {/* Desktop (Horizontal Stepper) */}
    <div className="hidden sm:block w-full">
      <Stack>
        <Stepper alternativeLabel activeStep={status} connector={<ColorlibConnector />}>
          {MilestoneData.map((step) => (
            <Step key={step.milestone} sx={{ px: 1.5, minWidth: "80px" }}>
              <StepLabel
                StepIconComponent={(props) => (
                  // @ts-ignore
                  <ColorlibStepIcon
                    {...props}
                    milestoneStatus={milestones[step.milestone]?.approvalStatus}
                    prevMilestoneStatus={milestones[step.milestone - 1]?.approvalStatus}
                    nextMilestoneStatus={milestones[step.milestone + 1]?.approvalStatus}
                    icon={
                      step.milestone === MilestoneEnum.M5 && transport === ITransportType.BY_AIR
                        ? <AirplaneTilt size={26} weight="duotone" />
                        : step.icon
                    }
                    status={status}
                    isBuyer={isBuyer}
                    hasNewDocuments={hasNewDocuments}
                    setActive={setActive}
                  />
                )}
              />
            </Step>
          ))}
        </Stepper>
      </Stack>
    </div>
  </>
);

}

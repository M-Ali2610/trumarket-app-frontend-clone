import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step, { stepClasses } from "@mui/material/Step";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
import StepContent, { stepContentClasses } from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { StepIconProps } from "@mui/material/StepIcon";
import classNames from "classnames";

import StepCounter from "src/components/common/step-counter";

import { ColorlibConnector, stepContentStyles, stepLabelStyles } from "./stepper-mui-custom";

function ColorlibStepIcon(props: StepIconProps & { totalSteps: number; label: string }) {
  return (
    <div className="relative">
      <StepCounter
        currentStep={props.icon as number}
        classOverrides={classNames("!text-[13px] !rounded-[20px]  border border-tm-black-20  !py-[3px] bg-tm-white")}
        invert
        innerClassName="text-[13px] font-normal"
        totalSteps={props.totalSteps}
        label={props.label}
      />
    </div>
  );
}

export default function VerticalLinearStepper({ steps, selectedIndex }: { steps: any[]; selectedIndex: number }) {
  const stepperStyles = (index: number) => {
    if (selectedIndex > index && selectedIndex !== index) {
      return {
        backgroundColor: "#ffffff",
        padding: "0px 30px",
        borderBottom: "1px solid #0000000d",
      };
    } else if (selectedIndex < index) {
      return {
        backgroundColor: "#0000000d",
        padding: "0px 30px",
        borderBottom: "1px solid #0000000d",
      };
    } else {
      return { backgroundColor: "#ffffff", padding: "30px", borderRadius: "4px" };
    }
  };

  return (
    <Box>
      <Stepper
  activeStep={selectedIndex}
  sx={{ [`&.${stepClasses.root}`]: { position: "relative", flex: "1" } }}
  connector={<ColorlibConnector />}
  orientation="vertical"
>
  {steps.map((step, index) => (
    <Step
      key={step.label}
      sx={{
        [`&.${stepClasses.root}`]: stepperStyles(index),
      }}
    >
      <div className="relative">
      {/* Step Counter (icon only) */}
      <StepLabel
        sx={stepLabelStyles}
        StepIconComponent={(props) => (
          <div className="flex justify-center sm:justify-start">
            {/* @ts-ignore */}
            <ColorlibStepIcon {...props} totalSteps={steps.length} label={step.label} />
          </div>         
        )}        
      />

      {/* ✅ Vertical line — positioned just below StepCounter */}
    {index === selectedIndex && (
      <div className="absolute left-[22px] top-[36px] h-[calc(100%-36px)] w-[1px] bg-tm-gray-light hidden sm:block"></div>
    )}

      {/* Filled values for completed steps */}
      {selectedIndex > index && (
        <div className="mt-4">
          {step.filledValues}
        </div>
      )}

      

      {/* Active Step Content: Centered Layout */}
      {selectedIndex === index && (
        <div className="mt-6 flex flex-col items-center justify-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between gap-6 px-4 sm:px-0">

          {/* Step Title + Hint */}
          <div className="w-full sm:w-1/2 max-w-[500px] sm:pl-[40px]">
            <div className="text-[20px] sm:text-[30px] font-bold text-tm-black-80">
              {step?.subLabel}
            </div>
            {step?.hint && (
              <p className="mt-2 text-[12px] text-tm-black-80">{step.hint}</p>
            )}
          </div>

          {/* Form */}
          <div className="w-full sm:w-1/2 max-w-[500px]">
            {step.nodeToRender}
          </div>
        </div>

        

        
      )}
      </div>
    </Step>
  ))}
</Stepper>

    </Box>
  );
}

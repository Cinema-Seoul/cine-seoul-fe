import clsx from "clsx";
import { steps } from "framer-motion";

export interface StepIndicatorProps extends BaseProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({
  className,
  //
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <ul className={clsx(className, "row items-center h-full")}>
      {steps.map((stepName, stepIndex) => (
        <li key={stepIndex} className={clsx(
          "col py-4 text-center"
        )}>
          <span>{stepIndex+1}. {stepName}</span>
        </li>
      ))}
    </ul>
  );
}

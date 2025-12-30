import { ReactNode } from 'react';
import {
  Step,
  StepLabel,
  Stepper as MuiStepper,
  StepperProps,
  Typography,
} from '@mui/material';
import { map } from 'lodash-es';

type Props = StepperProps & {
  currentStep: number;
  steps: ReactNode[];
};

export function Stepper({ currentStep, steps, ...props }: Props) {
  return (
    <MuiStepper activeStep={currentStep} alternativeLabel {...props}>
      {map(steps, (step, index) => (
        <Step key={index}>
          <StepLabel>
            <Typography variant="bodyXl" fontWeight={500}>
              {step}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
}

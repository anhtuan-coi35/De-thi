
import React from 'react';
import { AppStep } from '../types';
import { STEP_DEFINITIONS } from '../constants';

interface StepIndicatorProps {
  currentStep: AppStep;
  onStepClick: (step: AppStep) => void;
  maxStep: AppStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick, maxStep }) => {
  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center p-2 bg-white rounded-full shadow-lg">
        {STEP_DEFINITIONS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = step.id <= maxStep;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`flex items-center p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white scale-110 shadow-md'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${isClickable ? 'cursor-pointer hover:bg-blue-500 hover:text-white' : 'cursor-not-allowed'}`}
              >
                <i className={`fas ${step.icon} w-6 h-6 text-xl`}></i>
                <span className={`ml-3 font-semibold ${isActive ? 'block' : 'hidden md:block'}`}>{step.title}</span>
              </button>
              {index < STEP_DEFINITIONS.length - 1 && (
                <div className={`h-1 w-12 mx-2 rounded-full ${isCompleted || isActive ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

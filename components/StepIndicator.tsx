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
      <div className="flex items-center p-2 bg-white rounded-full shadow-md border border-slate-100 overflow-x-auto max-w-full">
        {STEP_DEFINITIONS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = step.id <= maxStep;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`flex items-center p-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                    : isCompleted
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-slate-100 text-slate-400'
                } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <i className={`fas ${step.icon} w-5 h-5 text-lg ${isCompleted ? 'fa-check' : step.icon}`}></i>
                <span className={`ml-3 font-semibold text-sm ${isActive ? 'block' : 'hidden md:block'}`}>{step.title}</span>
              </button>
              {index < STEP_DEFINITIONS.length - 1 && (
                <div className={`h-1 w-8 sm:w-12 mx-1 sm:mx-2 rounded-full transition-colors duration-300 ${isCompleted ? 'bg-emerald-400' : 'bg-slate-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
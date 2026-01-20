import React, { useState } from 'react'

const UseMultiStepForm = (steps) => {
    const [currentStep, setcurrentStep] = useState(0)
    const handleNext = () => {
        setcurrentStep((prev) => {
            if (prev >= steps.length - 1) return prev
            return prev + 1
        })
    }
    const handleBack = () => {
        setcurrentStep((prev) => {
            if (prev <= 0) return prev
            return prev - 1

        })
    }
    return {
        handleBack,
        handleNext,
        steps,
        step: steps[currentStep],
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,

    }
}

export default UseMultiStepForm
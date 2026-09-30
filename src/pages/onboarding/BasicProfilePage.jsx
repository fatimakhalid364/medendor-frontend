import {OnboardingLayout} from '@/layouts/OnboardingLayout';
import {doctorOnboardingSteps} from '@/config/onboardingSteps';
import { BasicProfileForm } from '@/components/onboarding/BasicProfileForm';


export const BasicProfilePage = () => {
    return (
        <OnboardingLayout 
            steps={doctorOnboardingSteps} 
            activeStep={0}
        >
          <BasicProfileForm/>  
        </OnboardingLayout>
    )
}
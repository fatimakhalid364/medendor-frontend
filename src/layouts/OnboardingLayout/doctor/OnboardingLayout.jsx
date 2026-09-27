import {VerticalStepper} from '@/components/ui/VerticalStepper'; 
import styles from './OnboardingLayout.module.css';

const doctorOnboardingSteps = [
  {
    id: "basic",
    title: "Basic Profile",
    description: "Add your personal and professional basic information.",
  },
  {
    id: "professional",
    title: "Professional Details",
    description: "Add your specialization and professional information.",
  },
  {
    id: "credentials",
    title: "Credentials",
    description: "Add your medical qualifications and certifications.",
  },
  {
    id: "availability",
    title: "Availability",
    description: "Set your workplace and consultation availability.",
  },
  {
    id: "final",
    title: "Final Touches",
    description: "Review your profile and complete your setup.",
  },
];

export const OnboardingLayout = ({
    children
})=> {
    return (
        <main className={styles.backdrop}>
            <section className={styles.stepperContainer}>
                <h3>Complete a few steps to finish setting up your profile.</h3>
                    <div className={styles.stepper}>
                        <VerticalStepper
                            steps={doctorOnboardingSteps}
                            activeStep={0}
                        /> 
                    </div>
            </section>
            <section className={styles.formContainer}>
                {children}
            </section>
        </main>
    )
}
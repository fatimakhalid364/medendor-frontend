import {VerticalStepper} from '@/components/ui/VerticalStepper'; 
import styles from './OnboardingLayout.module.css';


export const OnboardingLayout = ({
    children,
    steps,
    activeStep = 0
})=> {
    return (
        <main className={styles.backdrop}>
            <section className={styles.stepperContainer}>
                <p className={styles.header}>Complete a few steps to finish setting up your profile.</p>
                    <div className={styles.stepper}>
                        <VerticalStepper
                            steps={steps}
                            activeStep={activeStep}
                        /> 
                    </div>
            </section>
            <section className={styles.formContainer}>
                {children}
            </section>
        </main>
    )
}
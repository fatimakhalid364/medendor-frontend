import styles from "./VerticalStepper.module.css";

const DefaultIcon = ({ children }) => (
  <span className={styles.defaultIcon}>{children}</span>
);

export const VerticalStepper = ({
  steps = [],
  activeStep = 0,
  onStepClick,
  className = "",
}) => {
  return (
    <div className={`${styles.stepper} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isUpcoming = index > activeStep;

        const stepState = isCompleted
          ? "completed"
          : isActive
            ? "active"
            : "upcoming";

        const isClickable =
          typeof onStepClick === "function" && step.disabled !== true;

        return (
          <div
            key={step.id ?? index}
            className={`${styles.step} ${styles[stepState]}`}
          >
            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`${styles.connector} ${
                  isCompleted ? styles.connectorCompleted : ""
                }`}
              />
            )}

            {/* Icon */}
            <button
              type="button"
              className={`${styles.iconWrapper} ${
                isClickable ? styles.clickable : ""
              }`}
              onClick={() => {
                if (isClickable) {
                  onStepClick(index, step);
                }
              }}
              disabled={!isClickable}
              aria-current={isActive ? "step" : undefined}
              aria-label={step.title}
            >
              {step.icon ? (
                step.icon
              ) : isCompleted ? (
                <DefaultIcon>✓</DefaultIcon>
              ) : (
                <DefaultIcon>{index + 1}</DefaultIcon>
              )}
            </button>

            {/* Content */}
            <div className={styles.content}>
              <h3 className={styles.title}>{step.title}</h3>

              {step.description && (
                <p className={styles.description}>{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

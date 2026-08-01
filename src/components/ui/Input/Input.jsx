import styles from "./Input.module.css";

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  icon,
  rightIcon,
  onRightIconClick,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${icon ? styles.hasIcon : ""} ${rightIcon ? styles.hasRightIcon : ""} ${error ? styles.error : ""}`}
          {...props}
        />

        {rightIcon && (
          <button
            type="button"
            className={styles.rightIcon}
            onClick={onRightIconClick}
            tabIndex={onRightIconClick ? 0 : -1}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}


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
          className={`${styles.input} ${error ? styles.error : ""}`}
          {...props}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}


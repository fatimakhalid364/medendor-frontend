import styles from "./Dropdown.module.css";

export const Dropdown = ({
  label,
  name,
  value,
  options = [],
  placeholder = "Select an option",
  onChange,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div className={styles.selectWrapper}>
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${styles.select} ${error ? styles.error : ""} ${
              !value ? styles.placeholder : ""
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>⌄</span>
      </div>
      
      

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

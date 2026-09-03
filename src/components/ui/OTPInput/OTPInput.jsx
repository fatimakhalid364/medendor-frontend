import { OTPInput as InputOTP, REGEXP_ONLY_DIGITS } from "input-otp";
import styles from "./OTPInput.module.css";

export const OTPInput = ({ value, onChange }) => {
    return (
        <InputOTP
            maxLength={6}
            value={value}
            onChange={onChange}
            pattern={REGEXP_ONLY_DIGITS}
            inputMode="numeric"
            render={({ slots }) => (
                <div className={styles.container}>
                    {slots.map((slot, index) => (
                        <div
                            key={index}
                            className={`${styles.slot} ${
                                slot.isActive ? styles.active : ""
                            }`}
                        >
                            {slot.char}
                        </div>
                    ))}
                </div>
            )}
        />
    );
};
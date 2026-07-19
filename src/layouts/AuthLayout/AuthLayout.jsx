import styles from "./AuthLayout.module.css";
import authImage from "/images/auth-image.png";

export const AuthLayout = ({
  children
}) => {
  return (
    <main className={styles.backdrop}>
      <section className={styles.imgContainer}>
        <img
          src={authImage}
          alt='Authentication'
          className={styles.image}
        />
      </section>

      <section className={styles.formContainer}>
          {children}
      </section>
    </main>
  );
}


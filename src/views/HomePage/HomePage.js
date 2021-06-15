import Container from "../../components/Container";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <h1>Welcome to Contacts App</h1>
        <p className={styles.description}>
          This App made for help you to save your contacts online. You have
          acces to your contacts any time and from any device. You only should
          to register or login! Let's start!
        </p>
      </div>
    </Container>
  );
};

export default HomePage;

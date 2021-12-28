import { ReactChild, ReactFragment, ReactPortal } from "react";
import styles from './ClientCard.module.scss';


interface Props {
  name: string;
  avatarUrl: string
}

const ClientCard = (props: { name: string, avatarUrl: string}) => (
    <div className={styles.grid}>
    <a href="https://nextjs.org/docs" className={styles.card}>
      <div className={styles.avatarContainer}>
        <img 
          src={props.avatarUrl}
          className={styles.avatar}
        />
        <h2>{props.name}</h2>
      </div>
    </a>
  </div>
)

export default ClientCard;
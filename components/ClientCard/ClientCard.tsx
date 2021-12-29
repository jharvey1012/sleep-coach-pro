import { ReactChild, ReactFragment, ReactPortal } from "react";
import styles from './ClientCard.module.scss';
import Link from 'next/link';

const ClientCard = (props: { 
  id: number,
  name: string,
  avatarUrl: string
}) => (
  <div className={styles.grid}>
    <Link href={`/clients/${props.id}`}>
      <a href="https://nextjs.org/docs" className={styles.card}>
        <div className={styles.avatarContainer}>
          <img 
            src={props.avatarUrl}
            className={styles.avatar}
          />
          <h2>{props.name}</h2>
        </div>
      </a>
    </Link>
  </div>
)

export default ClientCard;
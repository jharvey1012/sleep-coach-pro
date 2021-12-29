import { ReactChild, ReactFragment, ReactPortal } from "react";
import ClientCard from "../ClientCard/ClientCard";
import styles from './ClientList.module.scss';
import fakeClientsList from '../../clients.json';

const ClientList = () => (
    <div className={styles.clients}>
        {fakeClientsList.map((fakeClient, index) => (
            <ClientCard 
              key={fakeClient.id}
              id={fakeClient.id}
              name={fakeClient.name}
              avatarUrl={fakeClient.avatarUrl}
            />
        ))}
    </div>
)

export default ClientList;
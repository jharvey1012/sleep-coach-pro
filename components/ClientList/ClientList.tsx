import { ReactChild, ReactFragment, ReactPortal } from "react";
import ClientCard from "../ClientCard/ClientCard";
import styles from './ClientList.module.scss';


const fakeClientsList = [
    {
        name: 'John Smith',
        avatarUrl: 'https://scontent.fsan1-1.fna.fbcdn.net/v/t39.30808-6/242073220_4333361020076893_202100549478246514_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=15pk_i3yefsAX-Ibj3o&_nc_ht=scontent.fsan1-1.fna&oh=00_AT-hiEpOuzzXZCNzahyXFpaDkDeAH-D2IxlYoMeWB3JLfw&oe=61CF7585'
    },
    {
        name: 'Jane Doe',
        avatarUrl: 'https://scontent.fsan1-2.fna.fbcdn.net/v/t1.6435-9/169069082_4133876720012531_4179275951169226427_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zFmlEZ_R8fUAX-8rDU8&_nc_ht=scontent.fsan1-2.fna&oh=00_AT81JA9MzG3ZP4avV54Oxp4ERoUMy7qJolc5MPX7-QLNgA&oe=61F0B10D'
    },
    {
        name: 'Parsey McParkinson',
        avatarUrl: 'https://scontent.fsan1-2.fna.fbcdn.net/v/t39.30808-6/228202309_10226048964315774_6296705680399230782_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wSu_msUVZ-4AX8_S0Mq&_nc_ht=scontent.fsan1-2.fna&oh=00_AT8RCNfBjvuiR4738JzDJ34-s8GIixOj4Uyw596x8e3W4w&oe=61D0C56E'
    }
]




const ClientList = () => (
    <div className={styles.clients}>
        {fakeClientsList.map((fakeClient, index) => (
            <ClientCard 
              key={index}
              name={fakeClient.name}
              avatarUrl={fakeClient.avatarUrl}
            />
        ))}
    </div>
)

export default ClientList;
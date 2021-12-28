import { ReactChild, ReactFragment, ReactPortal } from "react";
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => (
    <div className={styles.navbar}>
        <img src="https://eightsleep.dexecure.net/s/files/1/1354/6123/files/Logo_White.svg?10878386720812330155" alt="Eight Sleep Logo" loading="lazy" className="Img_img__1HXDs"></img>
        <div className={styles.navRight}>
            <ul>
                <li>
                    <Link href="/clients">
                        <a>Clients</a>
                    </Link>
                </li>
            </ul>
            <img src="https://scontent.fsan1-2.fna.fbcdn.net/v/t39.30808-6/244347444_10226825911016519_8731931133894383359_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KljwE1hnFRsAX_1ITcq&tn=jbOOX2DlWiICB74V&_nc_ht=scontent.fsan1-2.fna&oh=00_AT-iFd6IfhZd_M-wpJFviH30c3BHApzf4d3vjw57XBZkuQ&oe=61D03D3A" />
        </div>
    </div>
)

export default Header;
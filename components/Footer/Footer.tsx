import { ReactChild, ReactFragment, ReactPortal } from "react";
import styles from './Footer.module.scss';

const Footer = () => (
    <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <span className={styles.logo}>
        <img src="https://eightsleep.dexecure.net/s/files/1/1354/6123/files/Logo_White.svg?10878386720812330155" alt="Eight Sleep Logo" loading="lazy" class="Img_img__1HXDs"></img>
      </span>
    </a>
  </footer>
)

export default Footer;
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import styles from './Button.module.scss';

const Button = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, onClick: Function }) => (
 <button 
   onClick={() => props.onClick()} 
   className={styles.button}
>
    {props.children}
</button>
)

export default Button;
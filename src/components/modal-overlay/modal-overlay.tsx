import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({children, onClick}) => {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  )
}

export default ModalOverlay;

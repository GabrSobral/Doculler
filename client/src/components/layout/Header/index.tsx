
import { useTheme } from '../../../contexts/Theme/hook';

import styles from './style.module.scss'

interface Props {

}

export const Header = ({ } : Props) => {
  const { handleTheme } = useTheme();
  
  return (
    <header className={styles.container}>
      <button type="button" onClick={handleTheme}>
        Theme
      </button>
    </header>
  )
}
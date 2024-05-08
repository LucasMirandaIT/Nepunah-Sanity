import Link from 'next/link'
import Header from './Header'
import styles from '~/styles/components/container.module.css';
import Footer from './Footer';

export default function Container({children, ...props}) {
// export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Header {...props} />
      <main className={styles.mainContent}>{children}</main>
      <Footer {...props} />
    </div>
  )
}

import styles from '@/app/ui/home.module.css';
import Link from 'next/link';
export default function Home() {
  return (
    <div className={styles.container}>
       <Link href='/login' className={styles.content}> Go to login page</Link>
    </div>
  );
}

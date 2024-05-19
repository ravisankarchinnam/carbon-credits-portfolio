import styles from "./page.module.css";
import { AppContent } from "@/components/AppContent";

export default function Home() {
  return (
    <main className={styles.main}>
      <AppContent />  
    </main>
  );
}

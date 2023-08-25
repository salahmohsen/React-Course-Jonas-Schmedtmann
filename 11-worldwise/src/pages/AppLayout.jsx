import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { useAuthContext } from "../contexts/FakeAuthContext";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;

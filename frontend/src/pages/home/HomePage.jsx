import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./Homescreen";

const HomePage = () => {
    const { user } = useAuthStore();

    return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
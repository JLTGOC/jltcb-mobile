import { Text, Button } from "react-native-paper";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";
import { logout } from "@/src/services/auth";
import { routes } from "@/src/constants/routes";


export default function MarketingNavBar() {
  const {logoutContext} = useAuth()
  const {navigate} = useNavigate()

  const handleLogout = async () => {
    try{
    const data = await logout();
    await logoutContext()
    navigate(routes.HOME);
  } catch (err){
    console.log(err)
  }
}

      return (
    <>
      <Text>Hello</Text>
      <Button onPress={handleLogout}>LOGOUT</Button>
    </>
  );
}

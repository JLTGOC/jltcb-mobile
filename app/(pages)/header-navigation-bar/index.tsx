import GuestNavBar from "./GuestNavBar";
import ClientNavBar from "./ClientNavBar";
import LeadASNavBar from "./employee/LeasASNavBar";
import MarketingNavBar from "./employee/MarketingNavBar";
import {useAuth} from "@/src/hooks/useAuth"

export default function Index() {

  const {role} = useAuth()

  if (role === "Client") return <ClientNavBar />;
  if (role === "Account Specialist") return <LeadASNavBar />;
  if (role === "Marketing") return <MarketingNavBar/>
  return <GuestNavBar />;
}
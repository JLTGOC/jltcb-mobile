import LeadASNavBar from "./Employee/LeadASNavBar";
import MarketingNavBar from "./Employee/MarketingNavBar";
import GuestNavBar from "./GuestNavBar";
import ClientNavBar from "./ClientNavBar";
type Props = { user: string };
export default function index({ user }: Props) {
  if (user === "Client") return <ClientNavBar />;
  if (user === "LeadAS") return <LeadASNavBar />;
  if (user === "Marketing") return <MarketingNavBar/>
  return <GuestNavBar />;
}

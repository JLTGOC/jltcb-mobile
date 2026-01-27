import LeadASNavBar from "./Employee/LeadASNavBar";
import MarketingNavBar from "./Employee/MarketingNavBar";
import GuestNavBar from "./GuestNavBar";
import ClientNavBar from "./ClientNavBar";

import {useAuth} from "@/src/hooks/useAuth"
import { useState } from "react";

export default function Index() {

  const {role} = useAuth()

  if (role === "Client") return <ClientNavBar />;
  if (role === "Account Specialist") return <LeadASNavBar />;
  if (role === "Marketing") return <MarketingNavBar/>
  return <GuestNavBar />;
}

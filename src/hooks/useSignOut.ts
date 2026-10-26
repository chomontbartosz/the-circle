import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSignOutAccount } from "../lib/react-query/queriesAndMutations";

// Wylogowanie + przeładowanie aplikacji (czyści stan i cache). Używane w LeftSidebar i Topbar.
export default function useSignOut() {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return () => signOut();
}

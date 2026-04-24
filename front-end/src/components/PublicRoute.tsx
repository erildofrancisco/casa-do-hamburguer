import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

const publicRoute = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isChecking, setIsChecking] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const cookie = document.cookie;
    if (cookie) {
      const cookies = cookie.split("; ");
      const userCookie = cookies.find((c) => c.startsWith("user="));
      if (userCookie) {
        navigate("/", { replace: true });
        return;
      }
    }
    setIsChecking(false);
  }, [navigate]);
  if (isChecking) {
    return <div>Carregando...</div>;
  }
  return <div>{children}</div>;
};

export default publicRoute;

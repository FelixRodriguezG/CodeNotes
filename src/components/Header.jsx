import { useState, useEffect } from "react";
import { useCheckConnection } from "../hooks/useCheckConnection";
import avatarImg from "../assets/avatar.svg";
import { ThemeToggle } from "./ThemeToggle";
import Button from "../components/button";
import Avatar from "../components/Avatar";

export default function Header() {
  const { status, run, isLoading } = useCheckConnection();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (status === "ok") {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const getLabel = () => {
    const labels = {
      unreachable: "No alcanzable",
      error: "Error",
      ok: "Conexión OK"
    };
    return isLoading ? "Verificando..." : labels[status] || "Verificar conexión";
  };

  const avatar = <Avatar src={avatarImg} alt="Perfil de usuario" className="h-5 ml-auto" />;

  return (
    <div className="flex items-center gap-4 w-full pr-4 ml-auto">
      {status === "ok" && showSuccess && (
        <span className="text-success">
          Conexión OK
        </span>
      )}
      {status !== "ok" && (
        <Button
          className=""
          onClick={run}
          size = "sd"
          isLoading={isLoading}
          variant={status === "error" ? "danger" : "primary"}
        >
          {getLabel()}
        </Button>
      )}
      <div className="flex ml-auto gap-3">

      <ThemeToggle />
      {avatar}
      </div>
    </div>
  );
}
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const portalRoot = document.getElementById("root");
  return ReactDOM.createPortal(children, portalRoot as Element);
}

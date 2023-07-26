import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className=" shadow-md">
      <nav className="flex gap-2 px-2 py-4 max-w-4xl mx-auto">
        <NavLink className="hover:underline underline-offset-2 " to="/">
          О приложении
        </NavLink>
        <NavLink className="hover:underline underline-offset-2" to="/ticker">
          Котировки
        </NavLink>
      </nav>
    </header>
  );
}

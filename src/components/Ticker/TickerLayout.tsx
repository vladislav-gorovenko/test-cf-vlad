import { Outlet, NavLink } from "react-router-dom";

export default function TickerLayout() {
  return (
    <div className="px-2 py-4 max-w-4xl mx-auto">
      <nav className="flex gap-2 mb-6 mt-2">
        <NavLink
          className="p-2 bg-slate-100 rounded hover:bg-slate-200"
          to="tab-a"
        >
          Котировки А
        </NavLink>
        <NavLink
          className="p-2 bg-slate-100 rounded hover:bg-slate-200"
          to="tab-b"
        >
          Котировки Б
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

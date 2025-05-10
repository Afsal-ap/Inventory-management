import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-6">Inventory App</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/inventory" className="hover:text-gray-300">Inventory</Link>
          <Link to="/customers" className="hover:text-gray-300">Customers</Link>
          <Link to="/sales" className="hover:text-gray-300">Sales</Link>
          <Link to="/reports" className="hover:text-gray-300">Reports</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;

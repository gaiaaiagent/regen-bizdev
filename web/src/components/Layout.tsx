import { Outlet, Link, useLocation } from 'react-router';
import { Leaf, Home, Database, GitBranch } from 'lucide-react';
import { cn } from '../lib/utils';
import { DemoRunner } from './DemoRunner';

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-regen-dark text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <Leaf className="h-5 w-5 text-green-400" />
            <span className="text-lg font-bold">Regen Network</span>
          </Link>
          <span className="text-sm text-white/50">|</span>
          <span className="text-sm text-white/70">Client Dashboard</span>

          <nav className="ml-auto flex items-center gap-4">
            {!isLanding && (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
              >
                <Home className="h-3.5 w-3.5" />
                Clients
              </Link>
            )}
            <Link
              to="/explore"
              className={cn(
                'flex items-center gap-1.5 text-sm hover:text-white',
                location.pathname.startsWith('/explore') ? 'text-white font-medium' : 'text-white/70',
              )}
            >
              <Database className="h-3.5 w-3.5" />
              Explore
            </Link>
            <Link
              to="/graph"
              className={cn(
                'flex items-center gap-1.5 text-sm hover:text-white',
                location.pathname.startsWith('/graph') ? 'text-white font-medium' : 'text-white/70',
              )}
            >
              <GitBranch className="h-3.5 w-3.5" />
              Graph
            </Link>
            {!isLanding && (
              <>
                <Link
                  to="/renew"
                  className={cn(
                    'text-sm hover:text-white',
                    location.pathname.startsWith('/renew') ? 'text-white font-medium' : 'text-white/70',
                  )}
                >
                  Renew
                </Link>
                <Link
                  to="/landbanking"
                  className={cn(
                    'text-sm hover:text-white',
                    location.pathname.startsWith('/landbanking') ? 'text-white font-medium' : 'text-white/70',
                  )}
                >
                  Landbanking
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>

      {/* Guided demo overlay */}
      <DemoRunner />
    </div>
  );
}

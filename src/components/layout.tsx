import React from "react";
import { useAuth } from "@/lib/auth";
import { Link, useLocation } from "wouter";
import { ShieldCheck, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated, isLoading, login } = useAuth();
  const [location] = useLocation();

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading session...</div>;

  if (!isAuthenticated) {
    // If trying to access protected route while not authenticated, 
    // automatically redirect to login or show access denied
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-center p-4">
        <h1 className="text-2xl font-bold mb-2">Access Required</h1>
        <p className="text-muted-foreground mb-4">You need to be logged in to view this page.</p>
        <Button onClick={() => login()}>Login with Keycloak</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary md:text-base">
            <ShieldCheck className="h-6 w-6" />
            <span className="hidden lg:inline">SecureApp</span>
          </Link>
          <Link href="/dashboard" className={location === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}>
            Dashboard
          </Link>
          <Link href="/profile" className={location === "/profile" ? "text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}>
            Profile
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <ShieldCheck className="h-6 w-6" />
                <span>SecureApp</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
              <Link href="/profile" className="hover:text-foreground">Profile</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || user?.preferred_username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

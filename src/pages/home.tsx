import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { login, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-8 text-center">
        <div className="mb-8 p-4 bg-primary/10 rounded-full ring-1 ring-primary/20 animate-in zoom-in duration-500">
          <Shield className="w-16 h-16 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
          Secure Access Management <br className="hidden md:block" />
          <span className="text-primary">Made Simple</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Experience a modern OIDC/OAuth2 authentication flow. 
          Securely manage identities, tokens, and user sessions with enterprise-grade standards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {isAuthenticated ? (
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" onClick={() => login()} className="h-12 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer">
              <Lock className="mr-2 h-5 w-5" />
              Login with SSO
            </Button>
          )}
          <Button variant="outline" size="lg" className="h-12 px-8 text-lg" asChild>
            <a href="https://openid.net/connect/" target="_blank" rel="noreferrer">
              Documentation
            </a>
          </Button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="bg-background py-24 px-8 border-t">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Single Sign-On</h3>
            <p className="text-muted-foreground">
              Seamlessly authenticate across multiple applications with a single set of credentials.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Standard Protocols</h3>
            <p className="text-muted-foreground">
              Built on industry-standard OIDC and OAuth 2.0 protocols for maximum compatibility.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Token Management</h3>
            <p className="text-muted-foreground">
              Visualize Access Tokens, ID Tokens, and Refresh Tokens in real-time.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>Mock OIDC Implementation for Demo Purposes</p>
      </footer>
    </div>
  );
}

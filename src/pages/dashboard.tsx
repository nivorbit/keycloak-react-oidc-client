import ProtectedLayout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CreditCard, DollarSign, ArrowUpRight, UserCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Dashboard() {
  const { user, user_raw } = useAuth();

  return (
    <ProtectedLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Welcome back, {user?.name || user?.preferred_username}</span>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="flex items-center" key={i}>
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      OM
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Olivia Martin</p>
                      <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>
                Current session details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-sm">Token Valid</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono break-all line-clamp-4">
                  {user_raw?.access_token || "No access token available"}
                </p>
              </div>
              
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Provider</span>
                   <span className="font-medium">Keycloak ({user_raw?.profile.iss || "Unknown"})</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Scope</span>
                   <span className="font-medium">{user_raw?.scope}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Expires In</span>
                   <span className="font-medium">{user_raw?.expires_in} seconds</span>
                 </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4" asChild>
                 <a href="/profile">View Full Claims <ArrowUpRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}

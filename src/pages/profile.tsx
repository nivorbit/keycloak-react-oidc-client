import ProtectedLayout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Profile() {
  const { user, user_raw } = useAuth();

  return (
    <ProtectedLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground mt-2">
            This information is retrieved from the Keycloak ID Token claims.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Standard OIDC claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                <span className="text-sm">{user?.name}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">Username</span>
                <span className="text-sm">{user?.preferred_username}</span>
              </div>
               <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">Verified</span>
                <Badge variant="outline" className="w-fit bg-green-50 text-green-700 border-green-200">
                  {user?.email_verified ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Realm Roles & Groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {/* 
                  Keycloak often puts roles in realm_access.roles or resource_access.[client].roles 
                  This is a safe fallback if 'roles' claim isn't directly mapped
                */}
                {user?.roles?.map((role) => (
                  <Badge key={role} variant="secondary" className="text-sm py-1 px-3">
                    {role}
                  </Badge>
                )) || (
                  <span className="text-sm text-muted-foreground italic">
                    No specific roles mapped in ID token. Check Keycloak mappers.
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Raw JSON Web Token (JWT) Claims</CardTitle>
              <CardDescription>Complete payload decoded from the ID Token</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/50 font-mono text-sm">
                <pre>{JSON.stringify(user_raw?.profile, null, 2)}</pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}

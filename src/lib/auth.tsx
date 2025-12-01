import React from "react";
import { AuthProvider as OidcAuthProvider, useAuth as useOidcAuth, AuthProviderProps } from "react-oidc-context";
import { User } from "oidc-client-ts";

const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:8180/realms/nivorbit",
  client_id: "public",
  redirect_uri: window.location.origin + "/dashboard",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  scope: "openid profile email",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <OidcAuthProvider {...oidcConfig}>
      {children}
    </OidcAuthProvider>
  );
}

export function useAuth() {
  const auth = useOidcAuth();
  
  return {
    ...auth,
    login: () => auth.signinRedirect(),
    logout: () => auth.signoutRedirect(),
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    user: auth.user?.profile as User["profile"] & { roles?: string[] } | undefined,
    user_raw: auth.user
  };
}

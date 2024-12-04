import { createContext, FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenResolver } from "../api/Request";
import { authenticatedPaths, unauthenticatedPaths } from "../routes";

export const AuthContext = createContext<{}>({});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // const setAccessToken = useCallback(
  //   (value: string | undefined) => {
  //     if (value) {
  //       _setAccessToken(value);
  //     } else {
  //       _removeAccessToken();
  //     }
  //   },
  //   [_setAccessToken, _removeAccessToken]
  // );

  // const setRefreshToken = useCallback(
  //   (value: string | undefined) => {
  //     if (value) {
  //       _setRefreshToken(value);
  //     } else {
  //       _removeRefreshToken();
  //     }
  //   },
  //   [_setRefreshToken, _removeRefreshToken]
  // );

  useEffect(() => {
    const tokenResolver = TokenResolver.getInstance();
    const isUnauthenticatedPath = unauthenticatedPaths.includes(location.pathname);
    const isAuthenticatedPath = authenticatedPaths.includes(location.pathname);
    const hasAccessToken = !!tokenResolver.accessToken;
    const hasRefreshToken = !!tokenResolver.refreshToken;

    if ((isUnauthenticatedPath && hasAccessToken) || (isUnauthenticatedPath && hasRefreshToken)) {
      navigate("/dashboard");
    } else if (isAuthenticatedPath && !hasAccessToken && !hasRefreshToken) {
      navigate("/login");
    } else if (location.pathname === "/") {
      if (hasAccessToken || (!hasAccessToken && hasRefreshToken)) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

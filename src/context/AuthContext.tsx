import { ReactNode, useState, useEffect, createContext } from "react";
import { auth } from "../services/firebaseConnection";
import { AuthProviderProps, UserProps } from "../interface/inputInterface";

type AuthProviderData = {
  singnedIn: boolean;
  loadingAuth: boolean;
  handleInformation: (user: UserProps) => void;
  user?: UserProps | null;
};

export const AuthContext = createContext({} as AuthProviderData);

function AuthProvider({ children }: AuthProviderProps) {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<UserProps | null>(null); //singed starts false

  useEffect(() => {
    //check if user is logged
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //update user information
  function handleInformation({ name, email, uid }: UserProps) {
    setUser({ name, email, uid });
  }

  return (
    <AuthContext.Provider
      value={{ singnedIn: !!user, loadingAuth, handleInformation, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

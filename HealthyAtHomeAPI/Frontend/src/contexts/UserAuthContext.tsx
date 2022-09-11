import {createContext, ReactChild, ReactChildren, useContext, useEffect, useState} from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {auth} from "../config/firebase-config";

interface IUserContext {
  user?: User | null | undefined;
  loading?: boolean;
  error?: string;
  isAdmin?: boolean;
  signInUser?: (user: any, password: any) => void;
  registerUser?: (email: any, password: any, name: any) => void;
  logoutUser?: () => void;
  forgotPassword?: (email: any) => void;
  signInWithGoogle?: () => void;
  signInWithFacebook?: () => void;
}

interface UserContextProviderProps {
  children: ReactChild | ReactChildren;
}

export const UserContext = createContext<IUserContext>({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [user, setUser] = useState<User | undefined | null>();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [error, setError] = useState("");
  const [fbToken, setFbToken] = useState<string | undefined>("");

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res);
      setError("");
    });
  }, []);

  useEffect(() => {
    fbToken && localStorage.setItem("FB_TOKEN", fbToken);
  }, [fbToken]);

  useEffect(() => {
    const checkForClaims = async () => {
      const result = await user?.getIdTokenResult();
      if (result) setIsAdmin(result.claims.hasOwnProperty("admin"));
      else setIsAdmin(false);
    };
    checkForClaims();
  }, [user]);

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      if (!result.user.emailVerified) {
        setError("You need to verify your account. Please check your email.");
      }

      return result;
    } catch (err) {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      setLoading(false);
      return result;
    } catch (er) {
      setError("Error signing in with selected provider");
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new FacebookAuthProvider());
      const credential = FacebookAuthProvider.credentialFromResult(result);
      let token;
      if (credential) token = credential.accessToken;
      setFbToken(token);
      setLoading(false);
      return result;
    } catch (er) {
      setError("Error signing in with selected provider");
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    return await signOut(auth);
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    logoutUser,
    forgotPassword,
    signInWithGoogle,
    signInWithFacebook,
    isAdmin,
  };
  return (
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

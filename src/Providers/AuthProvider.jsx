import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// context and auth
export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    // states and loaders
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);


    // catching states and getting current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email : userEmail }
            setUser(currentUser);
            if(currentUser){
                axiosSecure.post("/jwt", loggedUser)
                .then(res=>{
                    console.log("token response", res.data);
                })
                setLoading(false);
            }
            else{
                axiosSecure.post("/logout", loggedUser)
                .then(res=>{
                    console.log("clear token", res.data);
                })
                setLoading(false);
            }

        });
        return () =>{
            unsubscribe;
        }
    }, [axiosSecure])

    // google user
    const googleProvider = new GoogleAuthProvider();
    const googleRegister = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // create new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in existing user
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign out existing user
    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }


    // context value
    const authInfo = {
        user,
        loading,
        googleRegister,
        createUser,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
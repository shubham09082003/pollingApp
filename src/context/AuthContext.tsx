import { createContext , useEffect, useState , useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<{
    session: Session | null;
    signedUpNewUser: (email: string, password: string) => Promise<{success: boolean; data?: any; error?: any}>;
    signOut: () => Promise<void>;
    signInUser : (email : string , password : string) => Promise<{success : boolean ; data? : any ; error? : any}>;
    isLoading : boolean;
    }>({session: null, signedUpNewUser: async () => ({success: false}), signOut: async () => {} , signInUser : async () => ({success : true}) , isLoading : true});


export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoading , setIsLoading] = useState(true);      
    const [session , setSession] = useState<Session | null>(null);

    const signedUpNewUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if(error){
            console.error("Error at signup : " , error);
            return {success : false , error}
        }
        return {success : true , data}
    };

    const signInUser = async (email : string , password : string) => {
        try{
            const { data , error } = await supabase.auth.signInWithPassword({
                email : email,
                password : password
            });
            if(error){
                console.error("sign in error occured : ", error);
                return { success : false , error : error.message};
            }
            return { success : true , data : data};
        }
        catch(err){
            console.log(err);
            return { success : false , error : err };
        }
    }

    useEffect( () => {
        const getSession = async () => {
            const {data : {session}} = await supabase.auth.getSession();
            setSession(session)
            setIsLoading(false);
        }
        getSession();

        const { data : subscription} = supabase.auth.onAuthStateChange((_event,session) =>{
            setSession(session);
        });

        return () =>{
            (subscription as any).unsubscribe;
        }            
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if(error){
            console.log("error : ", error);
        }
    }   

    return(
        <AuthContext.Provider value={{session , signedUpNewUser , signOut, signInUser, isLoading}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
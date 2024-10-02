import { createContext } from "react";
import { UserDataContextType } from "../types/types";

export const UserDataContext = createContext<UserDataContextType>({
    userData: [],
    setUserData: () => {}
})
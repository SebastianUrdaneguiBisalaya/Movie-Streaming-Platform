import { useState, ReactNode } from "react";
import { UserDataContext } from "./userData";
import { UserData } from "../types/types";

export const UserDataProvider = ({children}: {children: ReactNode}) => {
    const [userData, setUserData] = useState<UserData[]>([]);

    return (
        <UserDataContext.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}
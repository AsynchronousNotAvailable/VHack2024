import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [currentUsername, setCurrentUsername] = useState(1);
    const [userId, setUserId] = useState(null); 
    const [firstLaunch, setFirstLaunch] = useState(false); //CHANGE LATER
    const [isAuth, setIsAuth] = useState(false); //CHANGE LATER
    const [transactions, setTransactions] = useState([]); 
    return (
        <GlobalContext.Provider
            value={{
                currentUsername,
                setCurrentUsername,
                firstLaunch,
                setFirstLaunch,
                isAuth,
                setIsAuth,
                userId,
                setUserId,
                transactions,
                setTransactions
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;

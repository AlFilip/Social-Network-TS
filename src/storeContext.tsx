import React from "react";
import {StoreType} from "./redux/store";

export const MyContext = React.createContext({} as StoreType)

type  ProviderProps = {
    store: StoreType
    children: React.ReactNode
}

const Provider = (props: ProviderProps) => {
    return (
        <MyContext.Provider value={props.store}>
            {props.children}
        </MyContext.Provider>
    )
}


export default Provider
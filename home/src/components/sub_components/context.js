import { createContext } from "react";

const IsDarkPreferedContext = createContext(false);
const SetDarkPreferedContext = createContext(() => {});

export { IsDarkPreferedContext, SetDarkPreferedContext };
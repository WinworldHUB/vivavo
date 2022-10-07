import { createContext } from "react";

const MastersContext = createContext({
    ranks: [],
    setRanks: (newRanks) => { 
        this.ranks = Array.from (newRanks);
    }
});

export default MastersContext;
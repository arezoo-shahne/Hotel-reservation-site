import  { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext=createContext()

function HotelProvider({children}) {
  const [serachParams, setSearchParams] = useSearchParams();
  const destination = serachParams.get("destination");
  const rooms = JSON.parse(serachParams.get("option"))?.room;
  const { isLoading, data:hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`
  );
  return(
    <HotelContext.Provider value={{isLoading,hotels}}>
      {children}
    </HotelContext.Provider>
  );
}



export default HotelProvider;

export function useHotel(){
  return useContext(HotelContext)
}

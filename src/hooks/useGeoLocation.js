import { useState } from "react";

export default function useGeoLocation() {
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [userPosition, setUserPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if(!navigator.geolocation) return setError("Your Browser Does Not Support GeoLocation")
        
    setIsLoadingPosition(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoadingPosition(false);
      },
      (error) => {
        setError(error.message);
        setIsLoadingPosition(false);
      }
    );
  }
  return { isLoadingPosition, userPosition, error, getPosition };
}

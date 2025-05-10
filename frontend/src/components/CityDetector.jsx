import React, { useEffect, useState } from "react";

const CityDetector = () => {
  const [city, setCity] = useState("Detecting...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const cityName =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;

            setCity(cityName);
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setCity("Unable to detect");
          }
        },
        (error) => {
          console.error("Location error:", error);
          setCity("Permission denied");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return (
    <div>
      <h3>Your City: {city}</h3>
    </div>
  );
};

export default CityDetector;

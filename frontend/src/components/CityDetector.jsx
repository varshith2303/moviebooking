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
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  'Accept-Language': 'en', // Force English responses
                },
              }
            );

            const data = await response.json();
            const address = data.address;

            const cityName =
              address.city ||
              address.town ||
              address.village ||
              address.hamlet ||
              address.county ||
              address.state ||
              "Unknown";

            // Clean suffixes like "Urban", "District", etc.
            const cleanedCity = cityName.replace(/ Urban| District| Metropolitan/g, '').trim();

            setCity(cleanedCity);
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setCity("Unable to detect");
          }
        },
        (error) => {
          console.error("Location permission error:", error);
          setCity("Permission denied");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return (
    <div className="text-center mt-4">
      <h3 className="text-lg font-semibold">Your City: {city}</h3>
    </div>
  );
};

export default CityDetector;

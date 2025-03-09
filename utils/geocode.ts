// utils/geocode.ts
export async function getCoordinatesFromZip(zipCode: string) {
  const apiKey = process.env.NEXT_PUBLIC_POSITIONSTACK_API_KEY;
  const response = await fetch(
    `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${zipCode}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to get coordinates");
  }
  
  const data = await response.json();
  const location = data.data[0];
  
  if (location) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  } else {
    throw new Error("Invalid zip code");
  }
}

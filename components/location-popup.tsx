"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react";
import { createClient } from '@/utils/supabase/client'

export function LocationPopup() {
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (userCoordinates) {
      try {
        console.log("saving coords", userCoordinates);
        localStorage.setItem(
          'userCoordinates',
          JSON.stringify(userCoordinates)
        );

        // also, if the user is logged in, save to their profile in the database
        const supabase = createClient();
        const saveCoordinates = async () => {
          try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
              console.error("Error fetching session:", error);
              return;
            }
            if (session?.user) {
              const userId = session.user.id;
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ user_latitude: userCoordinates.latitude, user_longitude: userCoordinates.longitude })
                .eq('id', userId);

              if (updateError) {
                console.error("Error saving coordinates to database:", updateError);
              }
            }
          } catch (e) {
            console.error("Error in saveCoordinates:", e);
          }
        };
        saveCoordinates();

      } catch (e) {
        console.error('Failed to save coords:', e);
      }
    } else {
      localStorage.removeItem('userCoordinates');
    }
  }, [userCoordinates]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          // Handle different error codes
          let errorMessage = "Failed to get location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied. Please allow access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Request timed out. Please try again.";
              break;
          }
          
          console.error("Error fetching geolocation:", error);
          setError(errorMessage);
          setIsLoading(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  const resetLocation = () => {
    setUserCoordinates(null);
    setError(null);
  };

  useEffect(() => {
    // Only request location on initial mount, not when coordinates change
    if (!userCoordinates && !error && !isLoading) {
      requestLocation();
    }
  }, []); // Empty dependency array for running only on mount

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Location Access</h3>
      
      {isLoading && (
        <div className="flex items-center space-x-2 text-muted-foreground mb-4">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Requesting your location...</span>
        </div>
      )}
      
      {error && (
        <div className="flex items-center space-x-2 text-red-500 mb-4">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {userCoordinates && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>Location accessed successfully</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Latitude: {userCoordinates.latitude.toFixed(6)}</p>
            <p>Longitude: {userCoordinates.longitude.toFixed(6)}</p>
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button 
          onClick={requestLocation} 
          disabled={isLoading}
        >
          {userCoordinates ? "Update Location" : "Allow Location Access"}
        </Button>
        
        {userCoordinates && (
          <Button 
            variant="outline" 
            onClick={resetLocation}
          >
            Reset Location
          </Button>
        )}
      </div>
    </div>
  );
}
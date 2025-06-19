// User data structure - simple interface for API data
export interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  picture: {
    large: string;
  };
}

// Utility functions for user operations
export class UserUtils {
  // Get full name from user data
  static getFullName(user: User): string {
    return `${user.name.first} ${user.name.last}`;
  }

  // Get location display string
  static getLocationDisplay(user: User): string {
    return `${user.location.city}, ${user.location.country}`;
  }

  // Extract coordinates as numbers for weather API calls
  static getCoordinates(user: User): { lat: number; lng: number } {
    return {
      lat: parseFloat(user.location.coordinates.latitude),
      lng: parseFloat(user.location.coordinates.longitude),
    };
  }
}

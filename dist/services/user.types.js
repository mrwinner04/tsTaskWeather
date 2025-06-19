// Utility functions for user operations
export class UserUtils {
    // Get full name from user data
    static getFullName(user) {
        return `${user.name.first} ${user.name.last}`;
    }
    // Get location display string
    static getLocationDisplay(user) {
        return `${user.location.city}, ${user.location.country}`;
    }
    // Extract coordinates as numbers for weather API calls
    static getCoordinates(user) {
        return {
            lat: parseFloat(user.location.coordinates.latitude),
            lng: parseFloat(user.location.coordinates.longitude),
        };
    }
}
//# sourceMappingURL=user.types.js.map
import { UserUtils } from "../services/user.types.js";
import { WeatherService } from "../services/weather-service.js";
import { Logger } from "../utils/logger.js";
/**
 * Converter for transforming user data to combined user-weather data
 */
export class UserWeatherConverter {
    /**
     * Convert a user to user-weather data by fetching weather for their location
     */
    static async convertUserToUserWeatherData(user) {
        try {
            const coordinates = UserUtils.getCoordinates(user);
            const weather = await WeatherService.getCurrentWeather(coordinates.lat, coordinates.lng);
            return {
                user,
                weather,
            };
        }
        catch (error) {
            Logger.error("Error converting user to user-weather data:", error);
            return {
                user,
                weather: null,
            };
        }
    }
}
//# sourceMappingURL=user-weather-converter.js.map
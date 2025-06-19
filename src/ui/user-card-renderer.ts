import { UserWeatherData } from "./ui.types.js";
import { WeatherData } from "../services/weather.types.js";
import { User, UserUtils } from "../services/user.types.js";
import { Logger } from "../utils/logger.js";

/**
 * Class for rendering user cards with weather information
 */
export class UserCardRenderer {
  /**
   * Create a new user card element
   */
  static createUserCard(userWeatherData: UserWeatherData): HTMLElement {
    const card = document.createElement("div");
    card.className = "user-card";

    const coords = UserUtils.getCoordinates(userWeatherData.user);
    card.dataset.lat = coords.lat.toString();
    card.dataset.lng = coords.lng.toString();

    card.innerHTML = `
      <div class="user-card__header">
        <img src="${
          userWeatherData.user.picture.large
        }" alt="User avatar" class="user-card__avatar">
        <h2 class="user-card__name">${UserUtils.getFullName(
          userWeatherData.user
        )}</h2>
        <div class="user-card__location">${UserUtils.getLocationDisplay(
          userWeatherData.user
        )}</div>
      </div>
      <div class="user-card__weather">
        ${this.renderWeatherInfo(userWeatherData.weather)}
      </div>
    `;

    return card;
  }

  /**
   * Update weather information in a user card
   */
  static updateWeatherInfo(
    card: HTMLElement,
    weather: WeatherData | null
  ): void {
    const weatherContainer = card.querySelector(".user-card__weather");
    if (weatherContainer) {
      weatherContainer.innerHTML = this.renderWeatherInfo(weather);
    }
  }

  /**
   * Render weather information HTML
   */
  private static renderWeatherInfo(weather: WeatherData | null): string {
    if (!weather) {
      return `
        <div class="weather-info weather-error">
          <div class="weather-message">Weather data unavailable</div>
        </div>
      `;
    }

    const staleClass = weather.stale ? "weather-stale" : "";
    const staleWarning = weather.stale ? " ⚠️ Stale data" : "";

    return `
      <div class="weather-info ${staleClass}">
        <div class="weather-temperature">${weather.temperature}°C</div>
        <div class="weather-condition">${weather.condition}</div>
        <div class="weather-humidity">Humidity: ${weather.humidity}%</div>
        ${
          weather.stale
            ? '<div class="weather-warning">Using cached data</div>'
            : ""
        }
      </div>
    `;
  }
}

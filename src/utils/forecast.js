const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b93be7696f5d716e98471b8f689e958d&query=${lat},${long}&units=m`;
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback(`Unable to connect to the weather service!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location!`, undefined);
    } else {
      let currTemp = body.current.temperature;
      let feelsLike = body.current.feelslike;
      let description = body.current.weather_descriptions[0];
      let humidity = body.current.humidity;
      callback(
        undefined,
        `${description}. Its currently ${currTemp} degrees out. It feels like ${feelsLike} degrees out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;

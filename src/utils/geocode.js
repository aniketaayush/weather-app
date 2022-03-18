const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoib25oYXgiLCJhIjoiY2wwcng1d3VqMDViYzNicWRveDgxczA4bSJ9.U3OQtCuZ6a3HRKZwsz7tUw&limit=1`;

  request({ url, json: true }, (err, { body }={}) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to locate the place! Please try with a different search query.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
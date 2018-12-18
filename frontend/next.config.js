require('dotenv').config();

// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GOOGLE_GEOCODE_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GOOGLE_GEOCODE_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};

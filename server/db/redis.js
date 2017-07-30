const redis = require("redis").createClient();

redis.on("error", function(err) {
  console.log("Error " + err);
})

module.exports = { redis };

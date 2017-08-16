const redis = require("redis").createClient(process.env.REDIS_URI);

redis.on("error", function(err) {
  console.log("Error " + err);
})
redis.on("connect", () => {
  console.log('redis connected');
})

module.exports = { redis };

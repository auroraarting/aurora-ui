import Redis from "ioredis";

const redisClient = new Redis({
	host: "64.227.145.242",
	port: 6379,
	//   username: 'default',
	password:
		"aKAwsBVnsChBew7oL7yC+LLsHDTWHZHDvRzOD8aOUk+/ivR8/xMGWJmlfZArYD+8A436NkfKd5J/0IYY",
	db: 0,
});

export default redisClient;

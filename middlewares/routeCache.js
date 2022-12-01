import NodeCache from "node-cache";

const cache = new NodeCache();

export default (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.log("Cannot cache non-GET methods!");
    return next();
  }
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  // cachedResponse contains Content-Type and response body
  if (cachedResponse) {
    console.error(`Cache hit for ${key}`);
    res.set("Content-Type", cachedResponse[0]);
    res.send(cachedResponse[1]);
  } else {
    console.log(`Cache miss for ${key}`);
    res.originalSend = res.send;

    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, [res.get("Content-Type"), body], duration);
    };
    next();
  }
};

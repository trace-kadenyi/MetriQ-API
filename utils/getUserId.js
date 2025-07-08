const getUserId = (req) => {
  if (req.user && req.isAuthenticated()) {
    return req.user.id; // real Mongo ID
  }
  return req.header("x-anon-id") || null; // fallback to anon user
};

module.exports = { getUserId };

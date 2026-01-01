export function requireAuth(req, res, next) {
  if (!req.session?.user) {
    return res.sendStatus(401);
  }
  next();
}
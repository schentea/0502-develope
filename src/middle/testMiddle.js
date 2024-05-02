export const middle = (req, res, next) => {
  const ok = req.query.ok
  if(ok === "true") {
    next()
  }
  else {
    res.send("false")
  }
}
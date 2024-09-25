exports.patchClaimsValidActions = (req, res, next) => {
  const { user } = req.body;
  console.log(user);

  next();
};

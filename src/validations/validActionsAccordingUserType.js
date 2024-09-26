const validateSetNewClaimStatus = Object.freeze({
  1: function (res, next, claimNewStatus) {
    console.log('next in progress');

    next();
  },
  2: function (res, next, claimNewStatus) {
    console.log('next in progress');

    next();
  },
  3: function (res, next, claimNewStatus) {
    if (claimNewStatus !== 3) {
      return res.status(401).json({ ok: false, message: 'no autorizado' });
    }
    return next();
  },
});

exports.patchClaimsValidActions = (req, res, next) => {
  const { user } = req.body;
  const claimNewStatus = Number(req.body.claimNewStatus);
  validateSetNewClaimStatus[user.idTipoUsuario](res, next, claimNewStatus);
};

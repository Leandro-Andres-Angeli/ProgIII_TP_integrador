const getClaimsQueryAccordingUserType = Object.freeze({
  1: function (...args) {
    return { query: 'SELECT * FROM reclamos', args };
  },
});

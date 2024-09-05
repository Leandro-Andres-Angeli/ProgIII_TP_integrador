const checkIsLogged = (req, res, next) => {
  console.log('logged func in ');
  next();
};
const middleTest = (req, res, next) => {
  console.log('middle Test');
  next();
};

module.exports = { checkIsLogged, middleTest };

const passport = require('passport');
const { Strategy } = require('passport-local');

const checkIsLogged = (req, res, next) => {
  console.log('logged func in ');
  next();
};
const middleTest = (req, res, next) => {
  console.log('middle Test');
  next();
};

const passportStrategy = new Strategy((email, password, done) => {
  try {
    if (true) {
    }
    done();
  } catch (error) {
    console.log(error);
    done();
  }
});

module.exports = { checkIsLogged, middleTest, passportStrategy };

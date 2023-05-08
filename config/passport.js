const passport = require("passport");
const LocalStrtegy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrtegy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          // 檢查email是否存在
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(
              null,
              false,
              req.flash("warning_msg", "This email is not registered!")
            );
          }
          // 檢查密碼是否正確
          const isMatch = bcrypt.compareSync(password, user.password);
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash("warning_msg", "email or password incorrect!")
            );
          }
          return done(null, user, req.flash("success_msg", "login success!"));
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user.toJSON());
    } catch (err) {
      done(err, null);
    }
  });
};

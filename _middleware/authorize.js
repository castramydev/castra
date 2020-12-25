const jwt = require('jsonwebtoken');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        // jwt({ secret, algorithms: ['HS256'] }),
        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            // console.log(req.user);
            // const user = await db.User.findByPk(req.user.sub);
            // const campsites = await db.Campsite.findByPk(req.params.id);
            // // check user still exists
            // // console.log(req);
            // if (!user) return res.status(401).json({ message: "Unauthorized" });
            // // else if (!campsites)
            // //   return res
            // //     .status(401)
            // //     .json({ message: "There's no such record." });

            // // authorization successful
            // req.user = user.get();
            // req.campsites = campsites.get();
            const authHeader = req.headers.authorization;

            if (authHeader) {
              const token = authHeader.split(" ")[1];

              jwt.verify(token, secret, (err, user) => {
                if (err) {
                  return res.sendStatus(403);
                }

                req.user = user;
                next();
              });
            } else {
              console.log('unauthorized');
              res.status(401).json({message: "Unauthorized!"});
            }
            // next();
        }
    ];
}
const passport = require('passport')
const OrcidStrategy = require('passport-orcid')
const config = require('config')
const authentication = require('pubsweet-server/src/authentication')
const fetchUserDetails = require('./fetchUserDetails')

const CALLBACK_URL = '/auth/orcid/callback'

module.exports = app => {
  // eslint-disable-next-line global-require
  const { User } = require('@pubsweet/models')
  // set up OAuth client
  passport.use(
    new OrcidStrategy(
      {
        sandbox: process.env.NODE_ENV !== 'production',
        scope: '/authenticate',
        callbackURL: config.get('pubsweet-server.baseUrl') + CALLBACK_URL,
        ...config.get('auth-orcid'),
      },
      async (accessToken, refreshToken, params, profile, done) => {
        // convert oauth response into a user object
        let user
        try {
          user = await User.query()
            .joinRelation('identities')
            .where('identities.identifier', params.orcid)
            .where('identities.type', 'orcid')
            .throwIfNotFound()
            .first()
        } catch (err) {
          // swallow not found error
          if (err.name !== 'NotFoundError') {
            done(err)
            return
          }
        }

        // TODO: Update the user details on every login, asynchronously
        try {
          if (!user) {
            user = await new User({
              username: params.orcid.replace(/-/g, ''),
              defaultIdentity: {
                identifier: params.orcid,
                oauth: { accessToken, refreshToken },
                type: 'orcid',
                isDefault: true,
              },
            }).saveGraph()

            // Do another request to the ORCID API for aff/name
            const userDetails = await fetchUserDetails(user)

            user.defaultIdentity.name = `${userDetails.firstName} ${userDetails.lastName}`
            user.defaultIdentity.aff = userDetails.institution
            user.saveGraph()
          }
        } catch (err) {
          done(err)
          return
        }

        done(null, user)
      },
    ),
  )

  // handle sign in request
  app.get('/auth/orcid', passport.authenticate('orcid'))

  // handle oauth response
  app.get(
    CALLBACK_URL,
    passport.authenticate('orcid', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      const jwt = authentication.token.create(req.user)
      res.redirect(`/login?token=${jwt}`)
    },
  )
}

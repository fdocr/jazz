### Node JWT Template

This is an opinionated starter template for a lightweight Express based REST API. I put this together with the following ideas in mind:

* Database agnostic (probably the most important feature)
* Multiple environment setups out of the box
* Test suite template using mocha and chai
* Authentication using JWT (maybe questionable decision, but I trust & like it)

### What's included?

The code is so simple that this feels redundant, either way here it goes:

execute `npm start` and you'll have server listening on `http://localhost:5000` with the following endpoints:
* `GET /` -> Renders a simple __ejs__ template with some info
* `GET /public` -> Response in json format
* `GET /private` -> Response in json format requesting authentication

### Where to go from here?

Choose a database and authenticate users. The verification of the JWT is already implemented, all you need is to [sign the token](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback).

Why this authentication method? Mostly simplicity & stubbornness. I love discussing this subject but this is not the time or place. So, maybe give me a email/ping? [@fdoxyz](https://twitter.com/fdoxyz)

##### MIT Licensed

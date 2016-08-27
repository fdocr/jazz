### Node JWT Template

This is an opinionated starter template for a lightweight Express based REST API. It intends to remove the authentication burden that every API needs to solve before starting to work in their own specific implementation. It pursues compliance with the following ideals:

* Database agnostic (basically using [Passportjs](http://passportjs.org/))
* Multiple environment setups out of the box
* Test suite template using mocha and chai
* Authentication using JWT (I trust & like it)

Disclaimer: Still a WIP, it even has some custom names that would have to be modified manually. Current master is using postgres and ideally branches will support multiple databases (see [the list](https://github.com/fdoxyz/node-jwt-template/blob/master/CONTRIBUTING.md)).

Checkout the [contributing page](https://github.com/fdoxyz/node-jwt-template/blob/master/CONTRIBUTING.md) in case you are interested in giving me a hand.

### How-to

You will need a database listening on `localhost`, I created a simple [docker image](https://hub.docker.com/r/fdoxyz/test-postgres/) based on the official postgres image that sets up the test database and user. The `docker-compose.yml` is not finished yet, but I'm temporarily working with docker this way:

1. `docker run -d --name db -p 5432:5432 fdoxyz/test-postgres` will setup the test DB.
2. Run [nodemon](https://www.npmjs.com/package/nodemon) for autoreload.
3. Test using `npm test` or `make test`
4. (optional) To `psql` into the db: `docker run -it --rm --link db:db postgres psql -h db -U test -d test`

### Where to go from here?

Basically user authentication is handled with roles. That logic is localted in `config/passport.js`. It is intended to be as decoupled as possible and use JSON Web Tokens with [passport-jwt strategy](https://github.com/themikenicholson/passport-jwt).

Why this authentication method? Mostly because it's a stateless implementation, simplicity & personal stubbornness tbh. I love discussing this subject, shoot me an email or -> [@fdoxyz](https://twitter.com/fdoxyz)

Implemented & tested endpoints are documented [in the wiki](https://github.com/fdoxyz/node-jwt-template/wiki/API-Docs), check it out to understand what's going on here.

Pura vida.

### License

This template is released under __[the MIT License](https://github.com/fdoxyz/node-jwt-template/blob/master/LICENSE)__

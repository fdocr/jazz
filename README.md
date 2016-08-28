# Jazz Template

This is an opinionated starter template for lightweight NodeJS (Express based) REST APIs. It intends to kickstart development by implementing the common ground most API's share. It pursues the following ideals:

* Clean structure
* Role-based access control that doesn't suck
* Authentication using JSON Web Tokens
* Database agnostic (using [Passportjs](http://passportjs.org/))
* Multiple environment setups out of the box
* Test suite (easy to extend)
* Documentation (easy to extend)

__Disclaimer:__ Still a WIP, launch & check out the welcome page at `localhost:5000`. Current master is using postgres and ideally branches will support multiple databases. This will make a trivial quick start on either one depending on specific project needs (see the roadmap list [here](https://github.com/fdoxyz/jazz/blob/master/CONTRIBUTING.md#branches)).

Checkout the [contributing page](https://github.com/fdoxyz/jazz/blob/master/CONTRIBUTING.md) in case you are interested in giving me a hand.

### How-to

By default the app connects to a DB on `localhost`, set `DB_CONN_STRING` env variable to a custom DB as you please. [This docker image](https://hub.docker.com/r/fdoxyz/test-postgres/) sets up a DB that works with the default connection string for the development environment. The following steps will get you up and running easily (you will need [docker](https://docs.docker.com/engine/installation/)):

1. `docker run -d --name db -p 5432:5432 fdoxyz/test-postgres` will setup the test DB.
2. Run [nodemon](https://www.npmjs.com/package/nodemon) for autoreload.
3. Test using `npm test` or `make test`
4. (optional) To `psql` into the db: `docker run -it --rm --link db:db postgres psql -h db -U test -d test`

### Where to go from here?

Check out the [wiki-docs](https://github.com/fdoxyz/jazz/wiki/API-Docs) for usage details.

Pura vida.

### License

This project is released under [the MIT License](https://github.com/fdoxyz/jazz/blob/master/LICENSE)

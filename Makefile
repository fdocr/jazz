.PHONY: test

ifeq ("$(MOCHA_FILE)","test-results.xml")
  options=--reporter mocha-junit-reporter
endif

node_modules: package.json
	@npm install

test: node_modules
	mocha $(options)

docker-test:
	/node_modules/mocha $(options)

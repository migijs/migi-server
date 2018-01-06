build:
	@gulp

test-mocha:
	./node_modules/mocha/bin/_mocha --timeout 5000 tests/test.js -R spec

test: build test-mocha

coveralls:
	./node_modules/mocha/bin/mocha tests/test.js --require blanket --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-cov:
	./node_modules/mocha/bin/_mocha tests/test.js --require blanket -R html-cov > tests/coverage.html

.PHONY: build
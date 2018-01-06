build:
	@gulp

test-mocha:
	@mocha --timeout 5000 tests/test.js -R spec

test: build test-mocha

coveralls:
	@mocha tests/test.js --require blanket --reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-cov:
	@mocha tests/test.js --require blanket -R html-cov > tests/covrage.html

.PHONY: build
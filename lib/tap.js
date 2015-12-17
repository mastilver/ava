'use strict';
var format = require('util').format;

// Parses stack trace and extracts original function name, file name and line.
function getSourceFromStack(stack) {
	return stack
		.split('\n')
		.slice(2, 3)
		.join('')
		.replace(/^\s+at /, '');
}

exports.start = function () {
	console.log('TAP version 13');
};

var i = 0;

exports.test = function (test) {
	var output = [];

	output.push('# ' + test.title);

	if (test.error) {
		output.push(format('not ok %d - %s', ++i, test.error.message));
		output.push('  ---');
		output.push('    operator: ' + test.error.operator);
		output.push('    expected: ' + test.error.expected);
		output.push('    actual: ' + test.error.actual);
		output.push('    at: ' + getSourceFromStack(test.error.stack));
		output.push('  ...');
	} else {
		output.push(format('ok %d - %s', ++i, test.title));
	}

	console.log(output.join('\n'));
};

exports.finish = function (passCount, failCount) {
	console.log();
	console.log('1..' + (passCount + failCount));
	console.log('# tests ' + (passCount + failCount));
	console.log('# pass ' + passCount);
	console.log('# fail ' + failCount);
	console.log();
};

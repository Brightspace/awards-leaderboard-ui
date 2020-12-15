const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

const defaultPattern = 'test/**/*.js';
const customLaunchers = {
	chrome: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'OS X 10.15',
	},
	firefox: {
		base: 'SauceLabs',
		browserName: 'firefox',
		platform: 'OS X 10.15'
	},
	safari: {
		base: 'SauceLabs',
		browserName: 'safari',
		platform: 'OS X 10.15'
	},
	edge: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: 'latest'
	},
	edge_legacy: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: '18.17763'
	}
};

module.exports = config => {
	const defaultConfig = createDefaultConfig(config);

	defaultConfig.browsers = [];

	config.set(
		merge(defaultConfig, {
			files: [
				{
					pattern: config.grep ? config.grep : defaultPattern,
					type: 'module'
				},
			],
			esm: {
				nodeResolve: true,
			},
			sauceLabs: {
				testName: 'Awards Leaderboard UI Unit Tests',
				idleTimeout: 500
			},
			customLaunchers: customLaunchers,
			browsers: Object.keys(customLaunchers),
			reporters: ['saucelabs'],
			browserDisconnectTimeout: 50000,
			browserNoActivityTimeout: 300000,
			client: {
				mocha: {
					timeout: 10000
				}
			},
		}),
	);

	return config;
};

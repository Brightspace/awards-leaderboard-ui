const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

const defaultPattern = 'test/**/*.js';

module.exports = config => {
	config.set(
		merge(createDefaultConfig(config), {
			files: [
				{
					pattern: config.grep ? config.grep : defaultPattern,
					type: 'module'
				},
			],
			esm: {
				nodeResolve: true,
			},
			client: {
				mocha: {
					timeout: 10000
				}
			}
		}),
	);

	return config;
};

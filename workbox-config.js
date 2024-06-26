module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,ttf,ico}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
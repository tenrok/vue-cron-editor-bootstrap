const isProduction = process.env.NODE_ENV === 'production'
const isBuildLib = (process.env.npm_lifecycle_script || '').indexOf('--target lib') > 0

module.exports = {
	publicPath: isProduction ? '/vue-cron-editor-bootstrap/' : '',
	outputDir: isBuildLib ? 'dist' : 'demo',
	css: {
		extract: true,
	},
	productionSourceMap: false,
}

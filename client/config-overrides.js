const {
	override,
	fixBabelImports,
	addLessLoader,
	addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		// modifyVars: {'@primary-color': '#e6f7ff'},
		// modifyVars: {'@primary-color': '#f9c700'},
	}),
	addDecoratorsLegacy()
)

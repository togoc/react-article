// const { override, fixBabelImports } = require('customize-cra');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const theme = require('./theme')
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme,
    }),
);
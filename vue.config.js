const path = require('path')

module.exports = {
    lintOnSave: false,
    transpileDependencies: ['vuetify'],
    outputDir: path.join(__dirname, 'dist/client'),
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        entry: {
            app: './src/client/main.ts'
        }
    },
    devServer: {
        port: 8080,
        proxy: 'http://localhost:3000'
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].template = './src/client/public/index.html'
            return args
        })
    }
}

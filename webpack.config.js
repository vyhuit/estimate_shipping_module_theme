const path = require('path')
const glob = require("glob");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        "estimate-shipping-script": glob.sync('./src/estimate-shipping/*.js'),
        "estimate-shipping-style": glob.sync('./src/estimate-shipping/*.css'),
        // "images": glob.sync('./src/estimate-shipping/*.png'),
        // "fonts": glob.sync('./src/estimate-shipping/*.ttf'),
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './assets')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].min.css"
        }),
        new IgnoreEmitPlugin(["estimate-shipping-style.min.js", "iamges.min.js", "fonts.min.js"]),
    ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    // options: {
                    //     outputPath: '../fonts'  // folder name
                    // }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    // options: {
                    //     outputPath: '../images'  // folder name
                    // }
                }],
            },
            {
                test: /\.js|ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                // use: [MiniCssExtractPlugin.loader, "css-loader"],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    //   devServer: {
    //     static: {
    //       directory: path.resolve(__dirname, './dist')
    //     }
    //   },
}
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

path = require('path')
module.exports = (env) => {
    const isProd = env.mode === "production" ? true : false;
    const mode = isProd ? "production" : "development";
    return {
        mode: mode,
        output: {
            clean: true, //Clean "dist" before every new build
            filename: "main-[hash:8].js",
            path: path.resolve(__dirname, 'dist'),
            //Instead of file-loader we can use assetModuleFilename to load images
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        module: {
            rules: [{
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
                //For images
                {
                    test: /\.(png|gif|jpg|jpeg|ico)$/,
                    type: 'asset/resource'//Нашел способ загружать фото из хтмл
                },

                //js rules
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    // use: [{ loader: "babel-loader" }],
                    loader: "babel-loader",
                },
                //css rules
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {loader: "css-loader"},
                    ],
                },
                //scss rules
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: "css-loader"},
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        //It needs for auto-prefixing
                                        ["postcss-preset-env"],
                                    ],
                                },
                            }
                        },


                        {loader: "sass-loader"},
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "main-[hash:7].css",
            }),
        ],
        devServer: {
            open: true,
        },
        // devtool: "source-map",
    };
};

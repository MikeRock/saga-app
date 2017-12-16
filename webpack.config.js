import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
export default {  
    entry:{
        bundle:['babel-polyfill','./src/App'],
        vendor:['react','redux-saga','redux']
    },
    devtool:"source-map",
    output: {
        filename:'[name].js',
        path: path.resolve(__dirname,'./build'),
        publicPath: '/'
    },
    module: {
        rules:[{
            use: ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: 'css-loader',
                publicPath:'/'
            }),
            test: /.css$/
                },
            {
                use:'babel-loader',
                test: /.jsx?$/
            }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendor'],
            chunks:['vendor','bundle']
        }),
        // children: true selects ONLY lazy loaded children of the entry chunks into option.chunks 
        // and there they can be evaluated with minChunks
        // No other entry chunks are evaluated just lazy loaded children of the chunk/s specified in options.name
        // If no name is specified all chunks are selected - equivalent to specifying all chunks in an array 
        // which means every common chunk is evaluated seperately because an array of names means
        // a separate plugin execution for every member of the array
        // if async = true then a single (???) entry/commons chunk must be specified in options.name
        // Setting async generates a new file with shared dependancies of the child (lazy loaded) chunks
        // as oposed to with just children set when the common dependancies are added to the parent chunk (set in options.name
        //or to every parent chunk if options.name is not specified)
        // async = true can be changed to async = string to set the filename of the new chunk
        // It cannot (???) be set with filename. If not specified a number will be generated (???)
        new webpack.optimize.CommonsChunkPlugin({
            name:['manifest'],
            chunks:['vendor','bundle'],
            minChunks: Infinity
        }),
        new ChunkManifestPlugin({
            inlineManifest: false,
            filename:'manifest.json',
            manifestVariable: 'webpackManifest'

        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true            
        }),
        new webpack.BannerPlugin({
            banner: 'CHUNK [id] CHUNKNAME [name] HASH [chunkhash]'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]

}
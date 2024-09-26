module.exports = function override(config, env) {
    
    const { DefinePlugin } = require('webpack');

    
    config.plugins.push(
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify('https://api.example.com')
        })
    );

    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            setupMiddlewares: (middlewares, devServer) => {
                
                console.log('Настройка middlewares');
                return middlewares;
            },
        };
    }

    return config;
};

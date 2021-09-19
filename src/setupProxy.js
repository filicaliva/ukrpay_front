const { createProxyMiddleware } = require('http-proxy-middleware');

const endpoints = {
    8470: [
        '/api/Auth',
        '/api/User',
        '/api/UserCabinet',
        '/api/Auth',
        '/api/Role',
        '/api/Operations',
        '/api/RoleOperations'
    ],
    8471: ['/api/Dictionary'],
    8472: [`/api/TSPReportSettings`],
    8473: [`/api/Reports`],
    //8474: [`/api/Dictionary/DICT_MCC`],
};

module.exports = function (app) {
    app.use(
        endpoints['8470'],
        createProxyMiddleware({
            target: 'http://192.168.65.71:8470',
            changeOrigin: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    );
    app.use(
        endpoints['8471'],
        createProxyMiddleware({
            target: 'http://192.168.65.71:8471',
            changeOrigin: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    );
    app.use(
        endpoints['8472'],
        createProxyMiddleware({
            target: 'http://192.168.65.71:8472',
            changeOrigin: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    );
    app.use(
        endpoints['8473'],
        createProxyMiddleware({
            target: 'http://192.168.65.71:8473',
            changeOrigin: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    );
    // app.use(
    //     endpoints['8474'],
    //     createProxyMiddleware({
    //         target: 'http://192.168.65.71:8474',
    //         changeOrigin: true,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //         },
    //     })
    // );
};

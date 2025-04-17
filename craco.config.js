module.exports = {
    webpackDevServer: (configFunction) => {
      return (proxy, allowedHost) => {
        const config = configFunction(proxy, allowedHost);
        config.devServer.setupMiddlewares = (middlewares, devServer) => {
          // يمكنك تعديل الإعدادات هنا، مثل إضافة middleware مخصص
          return middlewares;
        };
        return config;
      };
    }
  };
  
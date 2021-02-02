module.exports = {
    devServer: {
        proxy: 'https://cdk-api.herokuapp.com/api/items'
    },

    transpileDependencies: [
      'vuetify'
    ]
};

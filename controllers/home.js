const request = require('request');

exports.index_Get = (req, res) => {	

    res.render('index',
        {
            static_path: process.env.STATIC_PATH || '/static',
            theme: process.env.THEME || 'cerulean'
    });
};
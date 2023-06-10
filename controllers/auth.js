const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// Code from https://github.com/danba340/oauth-github-example

const authRedirect = (req, res) => {
    // #swagger.summary = 'Redirect to GitHub Login'
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
}

const authCallback = ({ query: { code } }, res) => {
    // #swagger.summary = 'Authorization Callback Function'
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
        // eslint-disable-next-line no-console
        // console.log('My token:', token);

        res.redirect(`/?token=${token}`);
        })
        .catch((err) => res.status(500).json({ err: err.message }));
}

module.exports = {
    authRedirect,
    authCallback
};
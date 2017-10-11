import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../views/src/routes';
import { Provider } from 'react-redux';

let router = express.Router();

router.get('/', (req, res) => {
	match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			const html = ReactDOMServer.renderToString(
				<Provider store={{}}>
					<RouterContext {...renderProps} />
				</Provider>
			);
			res.status(200).send(renderFullPage(html));
		} else {
			res.status(404).send('Not found')
		}
	})
});


/*
In this function, you can render you html part of the webpage. You can add some meta tags or Opern Graph tags
using JS variables.
 */
function renderFullPage(html) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Required meta tags always come first -->
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    	<meta http-equiv="x-ua-compatible" content="ie=edge">
    	<title>TapResearch</title>

        <link rel="stylesheet" href="/public/css/main.css">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    </head>
    <body>
    	<div id="reactbody"><div>${html}</div></div>
    	<script src="/public/js/app.bundle.js"></script>
    	<!-- jQuery first, then Bootstrap JS. -->
    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>
    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
    </body>
    </html>
    `
}

export default router;

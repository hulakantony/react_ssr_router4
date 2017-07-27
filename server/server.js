/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import fs from 'fs';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import favicon from 'serve-favicon';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom';
import { fetchCounter } from '../common/api/counter'
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import compression from 'compression';
import thunk from 'redux-thunk';
import rootReducer from '../common/reducers';

import routes from '../common/routes';

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(favicon(path.join(process.cwd(), './favicon.ico')));
app.use(compression());
const store = createStore(rootReducer, applyMiddleware(thunk));

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}
app.get('*', (req, res) => {
  console.log(req.url);
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.url);
     const promises = branch.map(({route}) => {
      let fetchData = route.fetchData;
      return (fetchData instanceof Function) ? fetchData(store.dispatch) : Promise.resolve(null)
     });

     return Promise.all(promises);
   };
    loadBranchData()
      .then(() => {
        let context = {};
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        );
        res.send(renderFullPage(content, store.getState()))
      })
      .catch(err => {
        console.log(err);
      })
});


// app.use(handleRender)


app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

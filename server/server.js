/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import fs from 'fs';
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import StaticRouter from 'react-router-dom/StaticRouter';
import { fetchCounter } from '../common/api/counter'
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../common/reducers';

import routes from '../common/routes';

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

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

const handleRender = (req, res) => {
  // Query our mock API asynchronously
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({route}) => {
   let fetchData = route.component.fetchData;
   return (fetchData instanceof Function) ? fetchData(store) : Promise.resolve(null)
  });
  return Promise.all(promises).then(() => {
   let context = {};
   const content = renderToString(
     <Provider store={store}>
       <StaticRouter location={req.url} context={context}>
         {renderRoutes(routes)}
       </StaticRouter>
     </Provider>
   );
   res.send(renderFullPage(content, store.getState()))
  });
}

app.use(handleRender)


app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

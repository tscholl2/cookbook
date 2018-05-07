# Cookbook

![logo](logo.svg)

## What

A self hosted service to save/view personal recipes.

[Demo](https://tscholl2.github.io/cookbook/)

## Why

There is a lot of services to do this, but I thought it would be fun to build a self hosted one with all the features I wanted.
Also it is a good exercise in building apps.

## How

To run it, download the latest [release](https://github.com/tscholl2/cookbook/releases) and run it on your server.
It migt be helpful to run it behind something like [caddy](https://github.com/mholt/caddy) over `HTTPS` and a basicauth.

## Technical

The project is split into two parts:

### Backend

The backend is written in Go and runs an http server that 1) serves the frontend, and 2) hosts an API. The API has 3 endpoints:

* `/all`, GET, Download all recipes.
* `/add`, POST, Add a new recipe.
* `/edit`, POST, Edit a current recipe.

These endpoints are available at `http://yourserver.com/api/`.

### Frontend

The frontend is written in Typescript with [ultradom](https://github.com/jorgebucaran/ultradom), [parcel](https://parceljs.org/), and [spectre](https://picturepan2.github.io/spectre/).
It uses a redux-style immutable (using [icepick](https://github.com/aearly/icepick)) state container and is set up with some useful developer features such as redux-devtools, hot-reloading, and automatic test running via [tape](https://github.com/substack/tape). Think React but with only functional components. There is still plenty of room for optimizations via cacheing functions, but so far it hasn't been necessary because the site isn't that big.

## Development

To build and run the backend:

```
    go build -o cookbook -ldflags "-X github.com/tscholl2/cookbook/backend/server.version=`git rev-parse HEAD`" ./backend/cmd
```

To test the backend:

```
  go test ./backend/...
```

To run the frontend for development:

```
    cd frontend
    yarn install
    yarn run dev
```

To build the frontend (make sure to switch `api/index` to use the real api instead of the fake one):

```
    cd frontend
    yarn build
```

To test the frontend:

```
    cd frontend
    yarn test
```

## TODO

* ~~Add CLI paramaters to backend for port/file/etc~~.
* Make the API more "REST"-ful.
* Don't expect to be at top level path.
* Add "download" link.
* Add "help" popovers on image uploading.

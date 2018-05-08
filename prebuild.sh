cd frontend
yarn install
yarn build
cd ../
rm backend/server/static/*
cp frontend/dist/* backend/server/static/
# depends on:
#   go get -u -v github.com/mjibson/esc
go generate ./backend/...
go build -o cookbook ./backend/cmd/
# Next-Pocket
This project is a Discord clone that uses next.js and pocketbase. It builds next.js into pocketbase to be deployed as a single executeable.

## Notes
Originally this project started off as a simple chat app to test out pocketbase, as such adding voice and video channels were never on the scope.

## Getting Started

Fork this project

### client (Next.js)
```node
  cd client

  npm install
  
  npm run dev // for dev mode
```
your next.js project is now available at http://localhost:3000
### Server (PocketBase)
```go
cd pocketbase

go get -u  // go ^1.19 is needed

task start
```
pocketbase and its client UI are now available at http://localhost:8080
# Developement
you will notice after starting the server and going to the pocketbase client ui
at http://localhost:8080/_/ you wont have any collections
```
cd pocketbase
cp pb_schema.json
```
now you'll need to go to your pocketbase client and navigate to settings => import collections and paste the pb_schema.json there

### Getting your pocketbase types updated
this project uses npx pocketbase-typegen from (https://github.com/patmood/pocketbase-typegen)
```
// before running this please make sure the envs defined in
// client/gen.js are set or hardcode them there and add the file to .gitignore

npm run gen
```
# Deployment
To deploy this project run

```node
  npm run build-serve
```
this will build your next.js frontend into pocketbase to allow pocketbase to serve your app for easier deployment

#### Alternatively

For seperate apps run

```node
npm run build
```

an example docker compose can be found at pocketbase/docker-compose.yml 




## Authors

- [@Daniel Le](https://www.github.com/daniel-le97)
- [@Tung Le](https://www.github.com/TungLe0319)
- [@Tri Le](https://www.github.com/trile1122


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

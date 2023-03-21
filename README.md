# Next-Pocket
This project is a Discord clone that uses next.js and pocketbase. Pocketbase is in the pocketbase directory and can be extended to act as a go framework6


## Getting Started

Fork this project and open the pocket.code-workspace

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
## Developement
you will notice after starting the server and going to the pocketbase client ui
at http://localhost:8080/_/ you wont have any collections
```
cd pocketbase
cp pb_schema.json

```
now you'll need to go to your pocketbase client and navigate to settings => import collections and paste the pb_schema.json there

### Getting your pocketbase js client typed
this project uses npx pocketbase-typegen from (https://github.com/patmood/pocketbase-typegen)
i use the --json flag alternatively you could use the --url flag but it was a bit more finnicky to get working
this step is just navigating to settings => export collections and then adding that file to your pocketbase server
```
cd .. 
cd client
npm run type
```
## Deployment

To deploy this project run

```node
  npm run build-pb
```
this will build your next.js frontend into pocketbase to allow pocketbase to serve your app for easier deployment

#### Alternatively

For seperate apps run

```node
npm run build
```

an example docker compose can be found at pocketbase/docker-compose.yml 

## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)


## Authors

- [@Daniel Le](https://www.github.com/daniel-le97)
- [@Tung Le](https://www.github.com/TungLe0319)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

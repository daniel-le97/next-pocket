# Next-Pocket
This project is a Discord clone that uses next.js and pocketbase. Pocketbase is in the pocketbase directory and can be used as a go framework if needed


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

- [@octokatherine](https://www.github.com/octokatherine)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

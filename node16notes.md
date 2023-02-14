# node 16 upgrade notes

1. deleted all packages & Docker volumes/caches
2. Updated `Dockerfile-development` to pull from `node:16.19.0-bullseye`, the same one Ketida is using
3. switched with nvm to 16.19.0
4. `yarn install`
5. `docker compose build`
6. `docker compose up`

Error on startup (repeated a couple of times): 
```
kotahi-server-1        | (node:29) [DEP0128] DeprecationWarning: Invalid 'main' field in '/home/node/app/node_modules/node-blob/package.json' of 'server.js'. Please either fix that or report it to the module author
```

https://nodejs.org/api/all.html#DEP0128
https://github.com/sidequestlegend/node-blob/issues/5 – do we need a replacement for `node-blob`?
used in server/utils/fileStorageUtils.js and server/model-manuscript/src/migrations/1649401731-convert-inline-base64-in-source-to-inline-file-urls.js

when trying to upload manuscript which seems broken:
```
kotahi-server-1        | (node:53) [DEP0135] DeprecationWarning: ReadStream.prototype.open() is deprecated
```

7. Added to `package.json`: 

"resolutions": {
    "fs-capacitor": "^6.1.0"
}

8. yarn install, docker compose build, docker compose up.
9. Try to upload a file again – seems like it's broken in the way that it was under Apple Silicon.

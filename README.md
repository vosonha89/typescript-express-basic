<h1 align="center">Welcome to typescript-express-basic 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/typescript-express-basic" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/typescript-express-basic.svg">
  </a>
  <a href="https://github.com/vosonha89/typescript-express-basic#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vosonha89/typescript-express-basic/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/vosonha89/typescript-express-basic/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/vosonha89/typescript-express-basic" />
  </a>
</p>

> Basic api concept using typescript for express. 
```sh
https://www.npmjs.com/package/typescript-express-basic
```

### 🏠 [Homepage](https://github.com/vosonha89/typescript-express-basic#readme)
## Concept

![alt text](https://raw.githubusercontent.com/vosonha89/typescript-express-basic/main/public/images/typescript-express-basic.jpg?raw=true)

## Install
### Install express from https://expressjs.com/
```sh
npm install express --save
```
### Install extend express basic
```sh
npm install typescript-express-basic --save
```

## Optionals:
### Swagger UI
#### Compatable with https://brikev.github.io/express-jsdoc-swagger-docs/#/README, included in the 'test' folder
```sh
https://brikev.github.io/express-jsdoc-swagger-docs/#/README
```

### Creating example controller
#### Example file: https://github.com/vosonha89/typescript-express-basic/blob/main/test/src/controllers/publicController.ts
```sh
export class PublicController extends ApiController {
    public controllerName = 'public';

    @ApiRoute({
        method: ApiMethod.GET,
        path: '/get'
    })
    public get(req: Request, res: Response): void {
        const id = req.query.id;
        res.status(StatusCode.Ok);
        res.send('Public get ' + id);
    }
}
```
### Register app & controllers
#### Example file: https://github.com/vosonha89/typescript-express-basic/blob/main/test/src/index.ts
```sh
const port = 3000;
let app = apiExpress;
app.use(express.json());

// Register controller
app.registerController(new PublicController());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
```

## Run test project
```sh
npm run test

Link: http://localhost:3000
```

## Author

👤 **vosonha89**

* Github: [@vosonha89](https://github.com/vosonha89)
* LinkedIn: [@https:\/\/www.linkedin.com\/in\/vo-son-ha\/](https:\/\/www.linkedin.com\/in\/vo-son-ha\/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/vosonha89/typescript-express-basic/issues). You can also take a look at the [contributing guide](https://github.com/vosonha89/typescript-express-basic/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024 [vosonha89](https://github.com/vosonha89).<br />
This project is [MIT](https://github.com/vosonha89/typescript-express-basic/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
# AppTasks

> AppTasks allows ypu to load and start functions before your application starts
and after your application ends.


## Install

```
$ npm install --save apptasks
```


## Usage

```js
const apptasks = require('apptasks');

apptasks({
    preFolder: 'folder/for/start/functions',
    postFolder: 'folder/for/post/functions'
});
```


## API

### apptasks(options)

#### options

##### preFolder

Type: `string`<br>
Default: `pre`

Add functions that should be run before your application to this folder

##### postFolder

Type: `string`<br>
Default: `post`

Add functions that should be run when your application ends to this folder


## License

MIT © [kokujin](https://github.com/kokujin)

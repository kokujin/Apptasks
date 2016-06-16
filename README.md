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

Add functions that should be run when your application ends to this folder.

The functions should have the signature, Use the first return parameter to return
null or an error.

``````
function moduleName(cb) {
    cb(null, 'Result');
}
``````
module.exports = mod1;


## License

MIT © [kokujin](https://github.com/kokujin)

# WebdriverIO Debugger Service

Allows WebdriverIO tests to be paused, resumed and the ability to step through each command with a chrome browser extension.

When stepping through commands, the next command that is to be executed will have an orange border around the element.

![wdio-debugger-extension](https://user-images.githubusercontent.com/1300981/61260764-7d6b1180-a74d-11e9-9eee-7deec7af5c55.png)

This requires the [WebdriverIO Debugger Chrome extension](https://github.com/WillBrock/wdio-debugger-extension) which is explained more below.

## Setup the service

### Install

```bash
npm i -D wdio-debugger-service
```

### Config

Add the following to your services array in your config file

```javascript
services : [`debugger`]
```

## Setup the Chrome extension

Clone the [wdio-debugger-extension](https://github.com/WillBrock/wdio-debugger-extension)

```bash
git clone https://github.com/WillBrock/wdio-debugger-extension.git
```

Add the `load-extension` option to the chrome capabilities and specify the path to the wdio-debugger-extension

NOTE: The path must be absolute

```javascript
capabilities : [{
	maxInstances         : 1,
	browserName          : `chrome`,
	'goog:chromeOptions' : {
		args : [
			// This must be the absolute path where the clone directory is
			`load-extension=/absolute/path/to/clone/directory`,
		],
	},
}],
```

The extension will automatically load in the browser when running your tests. You'll notice the WebdriverIO icon in the top right of the browser toolbar.

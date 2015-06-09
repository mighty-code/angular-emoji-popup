#Forked Angular Emoji

An angular module to serve multiple purpose:

* A directive to render a comprehensive emoji popup from which user can select an emoji.
* Filters to encode the message containing emoji to various formats and decode them.

###[Demo(From original Repo)](http://coraza.github.io/angular-emoji-popup/)
**Demo for this repo you can find in the folder "*example*"**

##TODO
 - Make the Popover Icon Menu Mobile usable
 - Register as Bower Package
 - Tests

##Installation

Dependencies are [Bootstrap](https://github.com/twbs/bootstrap), [jQuery](https://github.com/jquery/jquery), [NanoScroller](https://github.com/jamesflorentino/nanoScrollerJS), [AngularJs](https://github.com/angular/angular) and `AangularJS's Sanitize` module. (More in bower.json)

***Note***: [jquery-emojiarea](https://github.com/diy/jquery-emojiarea) is not in bower.json due to custom modifications. ([More in jquery.emojiarea.custom.js](https://github.com/mighty-code/angular-emoji-popup/blob/master/src/js/jquery.emojiarea.custom.js))

###Stylesheet

You can build the vendor scripts and styles at your self **or take the following samples**:
####Dependencies
```html
<link type="text/stylesheet" rel="stylesheet" href="path/to//css/angular-emoji-vendor.min.css"/>
```

####Core Styles
The following styles are necessary:
```html
<link type="text/stylesheet" rel="stylesheet" href="path/to//css/angular-emoji.min.css"/>
```

###Scripts
#### Dependencies
```html
<script type="text/javascript" src="path/to/js/angular-emoji-vendor.min.js"></script>
```

####Core Scripts

```html
<script type="text/javascript" src="path/to/js/angular-emoji.min.js"></script>
```

###Customation with Laravel's Elixir
In most cases, you have to build scripts and styles at your self due to path reasons.
Here is how you can do that:

Install [Laravel's Elixir](http://laravel.com/docs/5.1/elixir) and dependencies

```sh
npm install --global gulp && npm install
```

Customize path for styles:

```less
// src/less/variables.less
@icon-dir : '../img'; // relative to this file!
```
Customize paths for scripts:

```javascript
// src/js/app.js

// relative to where this js is run at
$.emojiarea.path = '../img'; 
$.emojiarea.spritesheetPath = '../img/emojisprite_!.png'; 
```
Run gulp in this project's root
```bash
gulp
```

##Usage

The module consists of following components:

* `emojiForm` - Enclose this directive with a `textarea` and a `button` named `emojibtn`.
This directive adds a `contenteditable` `div` and hides the `textarea`. Anything typed into this `contebteditable` `div` is synced with the `textarea`. It also hooks up the button to show an Emoji popup. 

Inject the `emojiApp` module to your angular module:

```js
angular.module("myApp", ['ngSanitize', 'emojiApp']);
```
Add directive to your input field and place button
```html
<div emoji-form emoji-message="emojiMessage">
    <textarea id="messageInput" ng-model="emojiMessage.messagetext"></textarea>

    <button id="emojibtn">
        <i class="icon icon-emoji"></i>
    </button>
</div>
```

Make sure to initialize `emojiMessage` inside your controller

```js
emojiApp.controller('emojiController', ['$scope', function($scope) {

	$scope.emojiMessage={};
}]);
```
###Encoding 
By default, emoji are encoded to colon style string. Hence `emojiMessage.messagetext` will contain the encoded emoji with colons.

`emojiMessage.rawhtml` will contain the raw html string of the message.

For additional encodings, the following filters can be used

* `colonToCode` : Converts the colon style emoji string to string contaning UTF-8 characters

```html
<div ng-bind="emojiMessage.messagetext | colonToCode"> </div>
```

###Decoding 
For decoding the message string containing either colon style emojis or UTF-8 character emojis, following filters can be used:

* `codeToSmiley` : Converts the string containing UTF-8 characters to smiley representation using HTML

```html
<div ng-bind-html="emojiMessage.encodedtext | codeToSmiley"></div>
```

* `colonToSmiley` : Converts the string containing colon characters to smiley representation using HTML

```html
<div ng-bind-html="emojiMessage.encodedtext | colonToSmiley"></div>
```
###Note about encoding and decoding
There are various standards to encode and decode emojis. Most popular are:

* **Colon:** The emojis are converted to their colon style strings. This is simple to save in the database since its just a string.
See the mapping at [http://www.emoji-cheat-sheet.com/](http://www.emoji-cheat-sheet.com/)

* **UTF-8 Characters:** Emojis are mapped to their Unicode characters.  The advatage of this method is that some platforms (such as Android, iOS) can render them automatically as emoji unlike colon style encoding which almost always require decoding. On the disadvantage, Saving them in databases require special handling. See [note below](#db)

A comprehensive list of unicode codes can be obtained from [http://apps.timwhitlock.info/emoji/tables/unicode](http://apps.timwhitlock.info/emoji/tables/unicode)

* **HTML:** Emojis are converted to HTML `<img>` tags rendering each emoji as an image either from the single image or a sprite. 
This is the least useful method to adopt as its not cross platform. There is no standardization of Emoji sprite images and hence you will never be sure that target platform has the same emoji images.

This module contain various filters to encode and decode emojis in the above formats.

##Credits
This project utilizes snippets and ideas from following open source projects:

* [**Coraza (forked from)**](https://github.com/Coraza/angular-emoji-popup)
* [emoji-cheat-sheet](https://github.com/arvida/emoji-cheat-sheet.com)
* [jquery-emojiarea](https://github.com/diy/jquery-emojiarea)
* [nanoScrollerJS](https://github.com/jamesflorentino/nanoScrollerJS)
* [js-emoji](https://github.com/iamcal/js-emoji)
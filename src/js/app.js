/*
 * Angular Emoji Popup v0.4.0
 */

'use strict';

var emojiApp = angular.module("emojiApp", ['ngSanitize']);

emojiApp.config(['$sceProvider', function ($sceProvider) {

    $sceProvider.enabled(false);

    var icons = {},
        reverseIcons = {},
        i, j, hex, name, dataItem, row, column, totalColumns;

    for (j = 0; j < Config.EmojiCategories.length; j++) {
        totalColumns = Config.EmojiCategorySpritesheetDimens[j][1];
        for (i = 0; i < Config.EmojiCategories[j].length; i++) {
            dataItem = Config.Emoji[Config.EmojiCategories[j][i]];
            name = dataItem[1][0];
            row = Math.floor(i / totalColumns);
            column = (i % totalColumns);
            icons[':' + name + ':'] = [j, row, column,
                ':' + name + ':'
            ];
            reverseIcons[name] = dataItem[0];
        }
    }

    $.emojiarea.path = '../dist/img'; //relative to where this js is run at
    $.emojiarea.spritesheetPath = '../dist/img/emojisprite_!.png'; //relative to where this js is run at

    $.emojiarea.spritesheetDimens = Config.EmojiCategorySpritesheetDimens;
    $.emojiarea.iconSize = 20;
    $.emojiarea.icons = icons;
    $.emojiarea.reverseIcons = reverseIcons;
}]);


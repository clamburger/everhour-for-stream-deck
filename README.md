# Everhour for Stream Deck Plugin (unofficial)

This is a plugin that allows you to control your Everhour timer from your Stream Deck.

It comes with four actions:

* Show current task
* Show previous task (and allows you to start it)
* Stop timer
* Start a specific task

This is a personal project, and as such it's catered to my specific needs. It's not particularly well-designed and it might not work for you, but maybe there's somebody else out there who will find it useful as well!

Thanks to rweich for their excellent [streamdeck-ts-template](https://github.com/rweich/streamdeck-ts-template/), upon which this plugin is based.

## Installation

This plugin needs to be built before it can be used.

```
yarn install
yarn build-prod
```

This will create a folder called `org.clamburger.everhour.sdPlugin` in the `dist` directory. You will want to copy that folder into your [Stream Deck plugins directory](https://developer.elgato.com/documentation/stream-deck/sdk/create-your-own-plugin/#creating-your-plugin).

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

*Prerequisite: you must have the [Stream Deck application](https://www.elgato.com/downloads) already installed.*

1. Download the [latest release](https://github.com/clamburger/everhour-for-stream-deck/releases/latest/download/org.clamburger.everhour.streamDeckPlugin).
2. Double-click on the downloaded file to install the plugin.

Before you can use any of the actions, you'll need to add your Everhour API token, which you can get from [here](https://app.everhour.com/#/account/profile).
Add any of the actions to your layout and the copy your token into the API Token field.

## Actions

Most actions you can just drag onto your layout and start using. The "Start Tracking Time" action
is the only one that requires additional configuration.

### Show Current Task

This action shows the name of your currently running timer. Does nothing when pressed, but works
well when positioned next to the "Stop Timer" action.

### Stop Timer

If a timer is running, shows how much time has been tracked against that task for the current day.
When pressed, stops the timer.

(To avoid constant button updates, the time elapsed is updated once every ten seconds.)

### Resume Previous Task

When you stop a timer or switch to another task using the Stream Deck, the previous task name will
be displayed in this action. When pressing, will stop the current timer and resume the timer for the
displayed task.

### Start Tracking Time

This action requires configuration. When you add it to your layout, you'll need to enter the ID of
the task that you want to start tracking time against.

One way to get the ID of the task is to open up your [timesheet](https://app.everhour.com/#/time)
in Everhour and click on the title of a task. This will open up the task details in a popup and
change the URL to something like this:

```
https://app.everhour.com/#/time(view:as:1206085765420945)
```

In this case, the ID of the task is `as:1206085765420945`. Copy this into the Task ID field for the
action.

## Feedback

If you run into any problems or have any feature requests, please [open an issue](https://github.com/clamburger/everhour-for-stream-deck/issues/new).

## Development

### Requirements

* Node 18 or 20
* Yarn

### Building

Once you've cloned the repository, you can build the plugin by running:

```
yarn install
yarn build-prod
```

This will create a folder called `dev.org.clamburger.everhour.sdPlugin` in the `dist` directory. You will want to copy
or symlink that folder into your [Stream Deck plugins directory](https://docs.elgato.com/sdk/plugins/getting-started#4.-add-the-plugin-to-stream-deck).

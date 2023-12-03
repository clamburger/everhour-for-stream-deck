import Streamdeck from './classes/Streamdeck';
import Everhour from './Everhour';
import StopAction from './actions/StopAction';
import CurrentTaskAction from './actions/CurrentTaskAction';
import StartTaskAction from './actions/StartTaskAction';
import ResumeTaskAction from './actions/ResumeTaskAction';

// Create plugin instance
const plugin = new Streamdeck().plugin();

let interval: NodeJS.Timeout | null = null;
let currentTask: any | null = null;
let previousTask: any | null = null;

const registeredActions: Record<string, any> = {};

const actions: Record<string, Function> = {};
actions[StopAction.id] = StopAction;
actions[CurrentTaskAction.id] = CurrentTaskAction;
actions[StartTaskAction.id] = StartTaskAction;

plugin.on('websocketOpen', () => {
  plugin.getGlobalSettings(plugin.pluginUUID as string);
});

plugin.on('willAppear', ({ action: actionId, context, settings }) => {
  if (!interval) {
    interval = setInterval(updateTimerState, 10000);
    setTimeout(updateTimerState, 250);
  }

  actionId = shortenAction(actionId);
  const settingsRecord = settings as Record<string, any>;

  let action;

  switch (actionId) {
    case StopAction.id:
      action = new StopAction(context, settingsRecord);
      break;
    case CurrentTaskAction.id:
      action = new CurrentTaskAction(context, settingsRecord);
      break;
    case StartTaskAction.id:
      action = new StartTaskAction(context, settingsRecord);
      break;
    case ResumeTaskAction.id:
      action = new ResumeTaskAction(context, settingsRecord);
      break;
    default:
      throw `Unknown action "${actionId}"`;
  }

  registeredActions[context] = action;
});

plugin.on('willDisappear', ({ context }) => {
  delete registeredActions[context];

  if (Object.values(registeredActions).length === 0 && interval) {
    clearInterval(interval);
    interval = null;
  }
});

plugin.on('didReceiveGlobalSettings', ({ settings }) => {
  const globalSettings = settings as Record<string, any>;
  if (globalSettings.api_token) {
    Everhour.setApiToken(globalSettings.api_token);
  }
});

// Add event listeners
plugin.on('keyDown', ({ context }) => {
  const action = registeredActions[context];
  if (action) {
    action.onKeyDown();
  }
});

function updateTimerState() {
  if (!Everhour.getApiToken()) {
    console.warn('Timer update was requested but API token is not yet set');
    return;
  }

  Everhour.timers
    .get()
    .then((response) => response.json())
    .then((json) => {
      if (json.status === 'stopped') {
        if (currentTask !== null) {
          previousTask = currentTask;
        }
        currentTask = null;
      } else {
        if (currentTask === null || currentTask.task.id !== json.task.id) {
          previousTask = currentTask;
        }
        currentTask = json;
      }

      for (const action of Object.values(registeredActions)) {
        action.updateAppearance();
      }
    });
}

function shortenAction(actionId: string) {
  const info = plugin.info as SystemInfo;
  return actionId.replace(info.plugin.uuid + '.', '');
}

function getCurrentTask() {
  return currentTask;
}

function getPreviousTask() {
  return previousTask;
}

export { plugin as default, getCurrentTask, getPreviousTask, updateTimerState };

import Streamdeck from './classes/Streamdeck';

const inspector = new Streamdeck().propertyinspector();

let globalSettings: Record<string, any>;
let localSettings: Record<string, any>;

inspector.on('websocketOpen', ({ uuid }) => {
  inspector.getGlobalSettings(uuid);
  inspector.getSettings(uuid);

  const actionInfo = inspector.action as ActionInfo;
  const systemInfo = inspector.info as SystemInfo;
  const action = actionInfo.action.replace(systemInfo.plugin.uuid + '.', '');

  // Show action-specific settings
  const elements = document.querySelectorAll(`[data-actions~="${action}"]`) as NodeListOf<HTMLElement>;
  for (const element of elements) {
    element.style.display = 'flex';
  }

  // Update global settings on change
  const globals = document.querySelectorAll('input[name][data-type="global"]') as NodeListOf<HTMLInputElement>;
  for (const input of globals) {
    input.addEventListener('change', () => {
      const name = input.getAttribute('name') as string;
      globalSettings[name] = input.value;
      inspector.setGlobalSettings(inspector.pluginUUID as string, globalSettings);
    });
  }

  // Update local settings on change
  const locals = document.querySelectorAll('input[name][data-type="local"]') as NodeListOf<HTMLInputElement>;
  for (const input of locals) {
    input.addEventListener('change', () => {
      const name = input.getAttribute('name') as string;
      localSettings[name] = input.value;
      inspector.setSettings(inspector.pluginUUID as string, localSettings);
    });
  }
});

inspector.on('didReceiveGlobalSettings', ({ settings }) => {
  globalSettings = settings as Record<string, any>;

  // Populate the existing global settings
  for (const [key, value] of Object.entries(globalSettings)) {
    const input = document.querySelector(`input[data-type="global"][name="${key}"]`) as HTMLInputElement | null;
    if (input) {
      input.value = value;
    }
  }
});

inspector.on('didReceiveSettings', ({ settings }) => {
  localSettings = settings as Record<string, any>;

  // Populate the existing local settings
  for (const [key, value] of Object.entries(localSettings)) {
    const input = document.querySelector(`input[data-type="local"][name="${key}"]`) as HTMLInputElement | null;
    if (input) {
      input.value = value;
    }
  }
});

export default inspector;

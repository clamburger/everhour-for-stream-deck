import Images from '../Images';
import plugin, { getCurrentTask, updateTimerState } from '../Plugin';
import Action from './Action';
import Everhour from '../Everhour';

function secondsToTime(secs: number) {
  secs = Math.round(secs);
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  let minutes: number | string = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  let seconds: number | string = Math.ceil(divisor_for_seconds);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

export default class StopAction extends Action {
  static readonly id = 'stop';

  public updateAppearance(): void {
    const task = getCurrentTask();

    if (task) {
      const time = secondsToTime((task.today || 0) + task.duration);
      plugin.setTitle(time, this.context);
      plugin.setImage(Images.stop, this.context);
    } else {
      plugin.setTitle('', this.context);
      plugin.setImage(Images.stopDisabled, this.context);
    }
  }

  public onKeyDown(): void {
    console.log('Stopping timer');

    Everhour.timers
      .stop()
      .then(() => {
        updateTimerState();
      })
      .catch((e) => {
        console.error('Failed to stop timer', e);
        plugin.showAlert(this.context);
      });
  }
}

import Images from "../Images";
import plugin, {getCurrentTask, updateTimerState} from "../Plugin";
import Action from "./Action";
import Everhour from "../Everhour";

export default class StartTaskAction extends Action {
  static id = 'start-task';

  public updateAppearance() {
    if (!this.settings.task_id) {
      plugin.setImage(Images.startDisabled, this.context);
    } else if (this.isCurrentTask()) {
      plugin.setImage(Images.stop, this.context);
    } else {
      plugin.setImage(Images.start, this.context);
    }
  }

  public onKeyDown(): void {
    if (!this.settings.task_id) {
      console.error('Unable to start timer: no task ID');
      plugin.showAlert(this.context);
    } else if (this.isCurrentTask()) {
      console.log(`Stopping timer for task ${this.settings.task_id}`);
      Everhour.timers.stop()
        .then(() => {
          updateTimerState();
        })
        .catch((e) => {
          console.error('Failed to stop timer', e);
          plugin.showAlert(this.context);
        });
    } else {
      console.log(`Starting timer for task ${this.settings.task_id}`);

      Everhour.timers.start(this.settings.task_id)
        .then(() => {
          updateTimerState();
        })
        .catch((e) => {
          console.error('Failed to start timer', e);
          plugin.showAlert(this.context);
        });
    }
  }

  private isCurrentTask(): boolean {
    const task = getCurrentTask();
    return task && task.task.id === this.settings.task_id;
  }
}

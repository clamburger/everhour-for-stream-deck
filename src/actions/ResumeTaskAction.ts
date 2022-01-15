import plugin, {getCurrentTask, getPreviousTask, updateTimerState} from "../Plugin";
import Action from "./Action";
import Everhour from "../Everhour";

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export default class ResumeTaskAction extends Action {
  static id = 'resume-task';

  public updateAppearance() {
    plugin.setTitle('', this.context);

    let canvas = document.createElement('canvas');
    canvas.width = 144;
    canvas.height = 144;
    const tempCtx = canvas.getContext('2d')!;
    tempCtx.clearRect(0, 0, canvas.width, canvas.height);

    const task = getPreviousTask();
    if (task) {
      tempCtx.fillStyle = '#24be6a';
      tempCtx.rect(0, 0, canvas.width, canvas.height);
      tempCtx.fill();

      tempCtx.fillStyle = 'black';
      tempCtx.font = '30px sans-serif';

      tempCtx.fillText('Recent:', 10, 30);
      tempCtx.font = '20px sans-serif';

      wrapText(tempCtx, task.task.name, 10, 60, 144, 30);
    }

    const dataURL = canvas.toDataURL('image/png');
    plugin.setImage(dataURL, this.context);
  }

  public onKeyDown(): void {
    const task = getPreviousTask();

    if (!task) {
      return;
    }

    console.log(`Starting timer for previous task ${task.task.id}`);

    Everhour.timers.start(task.task.id)
      .then(() => {
        updateTimerState();
      })
      .catch((e) => {
        console.error('Failed to start timer', e);
        plugin.showAlert(this.context);
      });
  }
}

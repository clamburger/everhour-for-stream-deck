import plugin, { getCurrentTask, updateTimerState } from '../Plugin';
import Action from './Action';

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
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
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export default class CurrentTaskAction extends Action {
  static id = 'current-task';

  public updateAppearance() {
    plugin.setTitle('', this.context);

    let canvas = document.createElement('canvas');
    canvas.width = 144;
    canvas.height = 144;
    const tempCtx = canvas.getContext('2d')!;
    tempCtx.clearRect(0, 0, canvas.width, canvas.height);

    const task = getCurrentTask();
    const text = task ? task.task.name : 'No active task';

    tempCtx.font = '30px sans-serif';
    tempCtx.fillStyle = 'white';

    wrapText(tempCtx, text, 10, 25, 144, 30);

    const dataURL = canvas.toDataURL('image/png');
    plugin.setImage(dataURL, this.context);
  }

  public onKeyDown(): void {
    console.log('Updating Everhour state');

    updateTimerState();
  }
}

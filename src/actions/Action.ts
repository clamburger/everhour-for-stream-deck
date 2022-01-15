export default abstract class Action {
  protected context: string;
  protected settings: Record<string, any>;

  public constructor(context: string, settings: Record<string, any>) {
    this.context = context;
    this.settings = settings;
  }

  public abstract updateAppearance(): void;
  public onKeyDown(): void {};
}

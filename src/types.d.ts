type ActionInfo = {
  action: string,
  context: string,
  device: string,
  payload: {
    coordinates: {
      column: number,
      row: number,
    },
    settings: Record<string, any>,
  },
}

type SystemInfo = {
  application: Record<string, string>,
  colors: Record<string, string>,
  devicePixelRatio: number,
  devices: Array<unknown>,
  plugin: {
    uuid: string,
    version: string,
  },
}

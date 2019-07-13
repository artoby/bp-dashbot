import * as sdk from 'botpress/sdk'

import { DashbotService } from './dashbot'

let service: DashbotService

const onServerStarted = async (bp: typeof sdk) => {
  service = new DashbotService(bp)
  try {
    await service.initialize()
  } catch (err) {
    bp.logger.attachError(err).warn('Module misconfigured')
  }
}

const onServerReady = async (bp: typeof sdk) => {}

const onBotMount = async (bp: typeof sdk, botId: string) => {
  await service.mountBot(botId)
}

const onBotUnmount = async (bp: typeof sdk, botId: string) => {
  await service.unmountBot(botId)
}

const onModuleUnmount = async (bp: typeof sdk) => {
  bp.events.removeMiddleware('messenger.sendMessages')
  bp.http.deleteRouterForBot('channel-messenger')
}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  onBotMount,
  onBotUnmount,
  onModuleUnmount,
  definition: {
    name: 'dashbot',
    fullName: 'Dashbot',
    homepage: 'https://github.com/artoby/bp-dashbot',
    noInterface: true
  }
}

export default entryPoint

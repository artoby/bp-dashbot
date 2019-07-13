import * as sdk from 'botpress/sdk'

import _ from 'lodash'

import { Config } from '../config'

const interactionsToTrack = ['message', 'text', 'button', 'template', 'quick_reply', 'postback']

type MountedBot = { botId: string; client: any }

export class DashbotService {
  private mountedBots: MountedBot[] = []

  constructor(private bp: typeof sdk) {}

  initialize() {
    this.bp.events.registerMiddleware({
      description: 'Track outgoing messages in Dashbot',
      direction: 'outgoing',
      handler: this._handleOutgoingEvent.bind(this),
      name: 'dashbot.outgoing',
      order: 5
    })

    this.bp.events.registerMiddleware({
      description: 'Track incoming messages in Dashbot',
      direction: 'incoming',
      handler: this._handleIncomingEvent.bind(this),
      name: 'dashbot.incoming',
      order: 5
    })
  }

  async mountBot(botId: string) {
    const config = (await this.bp.config.getModuleConfigForBot('dashbot', botId)) as Config
    if (config.enabled) {
      // TODO implement
      // user config.[key_from_config]
      this.mountedBots.push({ botId: botId, client: null })
    }
  }

  async unmountBot(botId: string) {
    this.mountedBots = _.remove(this.mountedBots, (x: MountedBot) => x.botId === botId)
  }

  private async _handleOutgoingEvent(event: sdk.IO.Event, next: sdk.IO.MiddlewareNextCallback) {
    // TODO implement
    // temp
    console.log('Point #1 (outgoing): ' + event.payload.text)
    // !temp

    next()
  }

  private async _handleIncomingEvent(event: sdk.IO.Event, next: sdk.IO.MiddlewareNextCallback) {
    // TODO implement
    // temp
    console.log('Point #2 (incoming): ' + event.payload.text)
    // !temp

    next()
  }
}

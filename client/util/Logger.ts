/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { dev } from '../env'

function log(type, content) {
  const dev = true
  if (dev) {
   
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  } else {
    switch (type) {
      case 'log':
      case 'assert':
        return
    }
    // TODO SEND LOGS TO EXTERNAL SERVICE
    // eslint-disable-next-line no-console
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  }
}

export const logger = {
  log() {
    log('log', arguments)
  },
  error() {
    log('error', arguments)
  },
  warn() {
    log('warn', arguments)
  },
  assert() {
    log('assert', arguments)
  },
  trace() {
    log('trace', arguments)
  }
}

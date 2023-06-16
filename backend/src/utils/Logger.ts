import pino from 'pino'

export const logger = pino({
  name: 'fedapp-api',
  level: 'debug',
})

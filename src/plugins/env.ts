import fastifyEnv, { FastifyEnvOptions } from '@fastify/env';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin<FastifyEnvOptions>(async (fastify, opts, done) => {
  const config: FastifyEnvOptions = {
    ...opts,
    dotenv: true,
    confKey: 'config',
    data: process.env,
    schema: {
      type: 'object',
      required: ['MONGO_URL'],
      properties: {
        PORT: { type: 'integer', default: 3000 },
        NODE_ENV: { type: 'string', default: 'development' },
        MONGO_URL: { type: 'string' },
      },
    },
  };

  fastifyEnv(fastify, config, done);

  done();
});

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number;
      NODE_ENV: string;
      MONGO_URL: string;
    };
  }
}

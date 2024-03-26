import fastifyCors, { FastifyCorsOptions } from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin<FastifyCorsOptions>(
  async (fastify, opts, done) => {
    const config: FastifyCorsOptions = {
      ...opts,
      origin: [/\*ufrj\.br$/],
    };

    fastifyCors(fastify, config, done);

    done();
  }
);

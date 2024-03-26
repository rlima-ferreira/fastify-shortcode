import { FastifyStaticOptions, fastifyStatic } from '@fastify/static';
import { fastifyPlugin } from 'fastify-plugin';
import path from 'path';

export default fastifyPlugin<FastifyStaticOptions>(
  async (fastify, opts, done) => {
    const config: FastifyStaticOptions = {
      ...opts,
      root: path.join(__dirname, '../../public'),
      index: false,
    };

    await fastifyStatic(fastify, config);

    done();
  }
);

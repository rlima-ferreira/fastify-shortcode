import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin<FastifyMongodbOptions>(
  async (fastify, opts, done) => {
    const config: FastifyMongodbOptions = {
      ...opts,
      forceClose: true,
      url: fastify.config.MONGO_URL,
    };

    await fastifyMongodb(fastify, config);

    done();
  }
);

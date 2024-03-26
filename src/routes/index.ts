import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin<FastifyPluginAsync>(async (fastify) => {
  fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.sendFile('index.html');
  });
});

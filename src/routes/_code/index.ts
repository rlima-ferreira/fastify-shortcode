import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin<FastifyPluginAsync>(async (fastify) => {
  fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = req.params as any;
      const collection = fastify.mongo.db?.collection('pages');
      const page = await collection?.findOne({ code: params.code });

      if (page) reply.redirect(page.url);
      else reply.code(404).send({ page: null });
    } catch (err) {
      console.log((err as Error).message);
      reply.code(404).send({ page: null });
    }
  });
});

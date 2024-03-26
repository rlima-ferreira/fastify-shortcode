import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import ShortUniqueId from 'short-unique-id';

export default fastifyPlugin<FastifyPluginAsync>(async (fastify) => {
  fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const url = (req.query as any).search;
    const collection = fastify.mongo.db?.collection('pages');
    const page = await collection?.findOne({ url });

    if (page) reply.send({ page: `http://${req.hostname}/${page.code}` });
    else reply.code(404).send({ page: null });
  });

  fastify.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const payload = req.body as any;
    const code = new ShortUniqueId({ length: 8 });
    const collection = fastify.mongo.db?.collection('pages');
    const page = await collection?.insertOne({
      ...payload,
      code: code.rnd(),
    });

    if (page) {
      const result = await collection?.findOne(page.insertedId);

      if (result) {
        reply.code(201).send({ page: `http://${req.hostname}/${result.code}` });
      } else {
        reply
          .code(400)
          .send({ error: 'Não foi possível criar um link reduzido' });
      }
    }
  });
});

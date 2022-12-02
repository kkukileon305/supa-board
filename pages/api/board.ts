import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';
import supabase from '../../utils/supabaseClient';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { category } = req.query;

    if (category && typeof category === 'string') {
      const boards = await prisma.board.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          category,
        },
      });

      return res.json(boards);
    }

    const boards = await prisma.board.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return res.json(boards);
  } else if (req.method === 'POST') {
    const { access_token, title, content, category } = req.body;

    if (!access_token)
      return res.status(400).json({
        message: 'invalid token',
      });

    if (!title || !content || !category) {
      return res.status(400).json({
        message: 'no empty inputs',
      });
    }

    const { data, error } = await supabase.auth.getUser(access_token);

    if (error)
      return res.status(400).json({
        message: 'invalid token',
      });

    const board = await prisma.board.create({
      data: {
        title,
        content,
        username: data.user.user_metadata.username,
        category,
      },
    });

    return res.json({
      message: 'board created',
      board,
    });
  }
};

export default handler;

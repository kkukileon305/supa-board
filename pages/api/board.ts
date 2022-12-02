import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';
import supabase from '../../utils/supabaseClient';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { category, id } = req.query;

    if (id && typeof id === 'string') {
      const board = await prisma.board.findFirst({
        where: {
          id: Number(id),
          published: true,
        },
      });

      if (!board)
        return res.status(400).json({
          message: 'no id found',
        });

      return res.json(board);
    }

    if (category && typeof category === 'string') {
      const boards = await prisma.board.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          category,
          published: true,
        },
      });

      return res.json(boards);
    }

    const boards = await prisma.board.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        published: true,
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
  } else if (req.method === 'PATCH') {
    const { id, access_token } = req.body;

    if (!id || !access_token)
      return res.status(400).json({
        message: 'please token and id',
      });

    const {
      error,
      data: { user },
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return res.status(400).json({
        message: 'invalide token',
      });
    }

    const board = await prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!board)
      return res.status(400).json({
        message: '없는 게시글',
      });

    if (board.username !== user.user_metadata.username) {
      return res.status(400).json({
        message: '본인 글만 지울 수 있습니다',
      });
    }

    try {
      await prisma.board.update({
        where: {
          id,
        },
        data: {
          published: false,
        },
      });

      return res.json({
        mesage: 'board unpublished',
      });
    } catch (error) {
      return res.status(400).json({
        message: 'unknown error',
      });
    }
  }
};

export default handler;

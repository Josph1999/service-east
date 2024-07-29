import { NextResponse, type NextRequest } from 'next/server';
import { MediaType } from '@/app/enums/enums';
import { prisma } from '@/prisma/prisma';

import { type UpdateNewsInterface } from './interfaces/update-news.interface';

export async function GET(request: NextRequest, context: { params: { news_id: string } }): Promise<NextResponse> {
  try {
    const { news_id: newsId } = context.params;

    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
      include: {
        images: true,
      },
    });

    if (!news) {
      return NextResponse.json(
        {
          message: 'Speaker not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Speaker created succesfully',
        data: news,
        success: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        success: false,
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: NextRequest, context: { params: { news_id: string } }): Promise<NextResponse> {
  try {
    const { news_id: newsId } = context.params;

    const body = (await request.json()) as unknown as UpdateNewsInterface;

    const { description_ka: descKa, description_eng: descEng, images, title_eng: titleEng, title_ka: titleKa } = body;

    const speaker = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
      include: {
        images: true,
      },
    });

    if (!speaker) {
      return NextResponse.json(
        {
          message: 'Speaker not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    if (images) {
      for (const image of images) {
        const newsImage = await prisma.media.findFirst({
          where: {
            name: image.name,
          },
        });

        if (!newsImage) {
          await prisma.media.create({
            data: {
              media_type: image.type,
              name: image.name,
              news_id: newsId,
              original_name: image.original_name,
              type: MediaType.NEWS,
              url: image.url,
            },
          });
        }
      }

      for (const image of speaker.images) {
        const imageExist = images.find((img) => img.name === image.name);

        if (!imageExist) {
          await prisma.media.delete({
            where: {
              id: image.id,
            },
          });
        }
      }
    }

    const updatedNews = await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        title_eng: titleEng ? titleEng : speaker.title_eng,
        title_ka: titleKa ? titleKa : speaker.title_ka,
        description_eng: descEng ? descEng : speaker.description_eng,
        description_ka: descKa ? descKa : speaker.description_ka,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      {
        message: 'News updated succesfully',
        success: true,
        data: updatedNews,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        success: false,
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest, context: { params: { news_id: string } }): Promise<NextResponse> {
  try {
    const { news_id: newsId } = context.params;

    const speaker = await prisma.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!speaker) {
      return NextResponse.json(
        {
          message: 'News not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    await prisma.media.deleteMany({
      where: {
        news_id: newsId,
      },
    });

    await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return NextResponse.json(
      {
        message: 'News deleted succesfully',
        success: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Internal server error',
        success: false,
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}

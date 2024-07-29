import { NextResponse, type NextRequest } from 'next/server';
import { MediaType } from '@/app/enums/enums';
import { prisma } from '@/prisma/prisma';

import { type CreateNews, type UploadImagesInterface } from './interfaces/create-news.interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateNews;

    const { description_ka: descKa, description_eng: descEng, images, title_eng: titleEng, title_ka: titleKa } = data;

    const newsImages: UploadImagesInterface[] = [];

    const news = await prisma.news.create({
      data: {
        title_eng: titleEng,
        title_ka: titleKa,
        description_eng: descEng,
        description_ka: descKa,
      },
    });

    if (news) {
      for (const image of images) {
        newsImages.push({
          media_type: image.type,
          name: image.name,
          news_id: news.id,
          original_name: image.original_name,
          type: MediaType.NEWS,
          url: image.url,
        });
      }
    }

    await prisma.media.createMany({
      data: newsImages,
    });

    return NextResponse.json(
      {
        message: 'News created succesfully',
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const rowsPerPage = request.nextUrl.searchParams.get('rowsPerPage')!;
    const page = request.nextUrl.searchParams.get('page')!;
    const sortBy = request.nextUrl.searchParams.get('sortBy')!;
    const direction = request.nextUrl.searchParams.get('direction')!;

    const news = await prisma.news.findMany({
      take: Number(rowsPerPage),
      skip: (Number(page) - 1) * Number(rowsPerPage),
      include: {
        images: true,
      },
      orderBy: {
        [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
      },
    });

    const count = await prisma.news.count();

    return NextResponse.json(
      {
        message: 'News fetched succesfully',
        data: news,
        count,
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

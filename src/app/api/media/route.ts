import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type UploadMedia } from './interfaces/upload-media';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as UploadMedia;

    const { media } = data;

    await prisma.media.createMany({
      data: {
        media_type: media.type,
        name: media.name,
        original_name: media.original_name,
        type: 'gallery',
        url: media.url,
      },
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

    const gallery = await prisma.media.findMany({
      where: {
        type: 'gallery',
      },
      take: Number(rowsPerPage),
      skip: (Number(page) - 1) * Number(rowsPerPage),
      orderBy: {
        [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
      },
    });

    const count = await prisma.media.count();

    return NextResponse.json(
      {
        message: 'News fetched succesfully',
        data: gallery,
        count,
        success: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log('Error:', e);
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

import { NextResponse, type NextRequest } from 'next/server';
import { MediaType } from '@/app/enums/enums';
import { prisma } from '@/prisma/prisma';

import { type CreateSpeaker } from './interfaces/create-speaker.interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateSpeaker;

    const {
      name_eng: nameEng,
      name_ka: nameKa,
      position_eng: positionEng,
      position_ka: positionKa,
      image_name: imageName,
      image_original_name: imageOriginalName,
      media_type: mediaType,
      url,
    } = data;

    const speaker = await prisma.speaker.create({
      data: {
        name_eng: nameEng,
        name_ka: nameKa,
        position_eng: positionEng,
        position_ka: positionKa,
      },
    });

    if (imageName && mediaType && url && imageOriginalName) {
      await prisma.media.create({
        data: {
          url,
          media_type: mediaType,
          name: imageName,
          original_name: imageOriginalName,
          type: MediaType.SPEAKER,
          speaker_id: speaker.id
        },
      });
    }

    return NextResponse.json(
      {
        message: 'Speaker created succesfully',
        data: speaker,
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

    const speakers = await prisma.speaker.findMany({
      take: Number(rowsPerPage),
      skip: (Number(page) - 1) * Number(rowsPerPage),
      include: {
        image: true,
      },
      orderBy: {
        [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
      },
    });

    const count = await prisma.speaker.count();

    return NextResponse.json(
      {
        message: 'Speaker fetched succesfully',
        data: speakers,
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

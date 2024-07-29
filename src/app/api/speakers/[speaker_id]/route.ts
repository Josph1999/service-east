import { NextResponse, type NextRequest } from 'next/server';
import { MediaType } from '@/app/enums/enums';
import { prisma } from '@/prisma/prisma';

import { type UpdateSpeakerInterface } from './interfaces/update-speaker.interface';

export async function GET(request: NextRequest, context: { params: { speaker_id: string } }): Promise<NextResponse> {
  try {
    const { speaker_id: speakerId } = context.params;

    const speaker = await prisma.speaker.findUnique({
      where: {
        id: speakerId,
      },
      include: {
        image: true,
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

export async function PATCH(request: NextRequest, context: { params: { speaker_id: string } }): Promise<NextResponse> {
  try {
    const { speaker_id: speakerId } = context.params;

    const body = (await request.json()) as unknown as UpdateSpeakerInterface;

    const {
      image_name: imageName,
      image_original_name: imageOriginalName,
      media_type: mediaType,
      name_eng: nameEng,
      name_ka: nameKa,
      position_eng: prositionEng,
      position_ka: positionKa,
      url,
    } = body;

    const speaker = await prisma.speaker.findUnique({
      where: {
        id: speakerId,
      },
      include: {
        image: true,
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

    if (imageName && mediaType && url && imageOriginalName) {
      if (imageName !== speaker.image[0].name) {
        await prisma.media.updateMany({
          where: {
            speaker_id: speakerId,
          },
          data: {
            url,
            media_type: mediaType,
            name: imageName,
            original_name: imageOriginalName,
            type: MediaType.SPEAKER,
          },
        });
      }
    } else {
      await prisma.media.deleteMany({
        where: {
          speaker_id: speakerId,
        },
      });
    }

    const updatedSpeaker = await prisma.speaker.update({
      where: {
        id: speakerId,
      },
      data: {
        name_eng: nameEng ? nameEng : speaker.name_eng,
        name_ka: nameKa ? nameKa : speaker.name_ka,
        position_eng: prositionEng ? prositionEng : speaker.position_eng,
        position_ka: positionKa ? positionKa : speaker.position_ka,
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Speaker updated succesfully',
        data: updatedSpeaker,
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

export async function DELETE(request: NextRequest, context: { params: { speaker_id: string } }): Promise<NextResponse> {
  try {
    const { speaker_id: speakerId } = context.params;

    const speaker = await prisma.speaker.findUnique({
      where: {
        id: speakerId,
      },
      include: {
        image: true,
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

    await prisma.media.deleteMany({
      where: {
        speaker_id: speakerId,
      },
    });

    await prisma.speaker.delete({
      where: {
        id: speakerId,
      },
    });

    return NextResponse.json(
      {
        message: 'Speaker deleted succesfully',
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

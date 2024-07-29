import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type UpdateSponsorInterface } from './interfaces/update-sponsor.interface';

export async function GET(request: NextRequest, context: { params: { sponsor_id: string } }): Promise<NextResponse> {
  try {
    const { sponsor_id: sponsorId } = context.params;

    const sponsor = await prisma.sponsors.findUnique({
      where: {
        id: sponsorId,
      },
    });

    if (!sponsor) {
      return NextResponse.json(
        {
          message: 'Sponsor not found',
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
        message: 'Sponsor fetched succesfully',
        data: sponsor,
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

export async function PATCH(request: NextRequest, context: { params: { sponsor_id: string } }): Promise<NextResponse> {
  try {
    const { sponsor_id: sponsorId } = context.params;

    const body = (await request.json()) as unknown as UpdateSponsorInterface;

    const { image_name: imageName, link, logo_url: logoUrl } = body;

    const sponsor = await prisma.sponsors.findUnique({
      where: {
        id: sponsorId,
      },
    });

    if (!sponsor) {
      return NextResponse.json(
        {
          message: 'Sponsor not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const updatedSponsor = await prisma.sponsors.update({
      where: {
        id: sponsorId,
      },
      data: {
        image_name: imageName,
        link,
        logo_url: logoUrl,
      },
    });

    return NextResponse.json(
      {
        message: 'Sponsor updated succesfully',
        data: updatedSponsor,
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

export async function DELETE(request: NextRequest, context: { params: { sponsor_id: string } }): Promise<NextResponse> {
  try {
    const { sponsor_id: sponsorId } = context.params;

    const sponsor = await prisma.sponsors.findUnique({
      where: {
        id: sponsorId,
      },
    });

    if (!sponsor) {
      return NextResponse.json(
        {
          message: 'Sponsor not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    await prisma.sponsors.delete({
      where: {
        id: sponsorId,
      },
    });

    return NextResponse.json(
      {
        message: 'Sponsor deleted succesfully',
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

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type CreateSponsor } from './interfaces/create-sponsor.interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateSponsor;

    const { link, logo_url: logoUrl, image_name: imageName } = data;

    const sponsor = await prisma.sponsors.create({
      data: {
        link,
        logo_url: logoUrl,
        image_name: imageName,
      },
    });

    return NextResponse.json(
      {
        message: 'Sponsor created succesfully',
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

export async function GET(): Promise<NextResponse> {
  try {
    const sponsors = await prisma.sponsors.findMany();

    return NextResponse.json(
      {
        message: 'Speaker fetched succesfully',
        data: sponsors,
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

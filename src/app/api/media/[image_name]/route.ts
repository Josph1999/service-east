import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function DELETE(request: NextRequest, context: { params: { image_name: string } }): Promise<NextResponse> {
  try {
    const { image_name: imageName } = context.params;

    await prisma.media.deleteMany({
      where: {
        name: imageName,
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

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type UpdateVacancyInterface } from './interfaces/update-vacancy.interface';

export async function GET(request: NextRequest, context: { params: { vacancy_id: string } }): Promise<NextResponse> {
  try {
    const { vacancy_id: vacancyId } = context.params;

    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
      include: {
        files: true,
      },
    });

    if (!vacancy) {
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
        message: 'Vacancy fetched succesfully',
        data: vacancy,
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

export async function PATCH(request: NextRequest, context: { params: { vacancy_id: string } }): Promise<NextResponse> {
  try {
    const { vacancy_id: vacancyId } = context.params;

    const body = (await request.json()) as unknown as UpdateVacancyInterface;

    const {
      title_eng: titleEng,
      title_ka: titleKa,
      description_eng: descriptionEng,
      description_ka: descriptionKa,
      pdf_eng: pdfEng,
      pdf_ka: pdfKa,
    } = body;

    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
      include: {
        files: true,
      },
    });

    if (!vacancy) {
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

    if (pdfKa) {
      const vacancyPdfKa = vacancy.files.find((file) => file.lang === 'ka');

      if (!vacancyPdfKa) {
        await prisma.file.create({
          data: {
            lang: 'ka',
            media_type: pdfKa.type,
            name: pdfKa.name,
            original_name: pdfKa.original_name,
            url: pdfKa.url,
            vacancy_id: vacancy.id,
          },
        });
      }

      if (vacancyPdfKa && vacancyPdfKa.name !== pdfKa.name) {
        await prisma.file.updateMany({
          where: {
            vacancy_id: vacancyId,
            lang: 'ka',
          },
          data: {
            name: pdfKa.name,
            original_name: pdfKa.original_name,
            media_type: pdfKa.type,
            url: pdfKa.url,
          },
        });
      }
    } else {
      await prisma.file.deleteMany({
        where: {
          vacancy_id: vacancyId,
          lang: 'ka',
        },
      });
    }

    if (pdfEng) {
      const vacancyPdfEng = vacancy.files.find((file) => file.lang === 'eng');

      if (!vacancyPdfEng) {
        await prisma.file.create({
          data: {
            lang: 'eng',
            media_type: pdfEng.type,
            name: pdfEng.name,
            original_name: pdfEng.original_name,
            url: pdfEng.url,
            vacancy_id: vacancy.id,
          },
        });
      }
      if (vacancyPdfEng && vacancyPdfEng.name !== pdfEng.name) {
        await prisma.file.updateMany({
          where: {
            vacancy_id: vacancyId,
            lang: 'eng',
          },
          data: {
            name: pdfEng.name,
            original_name: pdfEng.original_name,
            media_type: pdfEng.type,
            url: pdfEng.url,
          },
        });
      }
    } else {
      await prisma.file.deleteMany({
        where: {
          vacancy_id: vacancyId,
          lang: 'eng',
        },
      });
    }

    const updatedSpeaker = await prisma.vacancy.update({
      where: {
        id: vacancyId,
      },
      data: {
        title_eng: titleEng ? titleEng : vacancy.title_eng,
        title_ka: titleKa ? titleKa : vacancy.title_ka,
        description_eng: descriptionEng ? descriptionEng : vacancy.description_eng,
        description_ka: descriptionKa ? descriptionKa : vacancy.description_ka,
      },
      include: {
        files: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Vacancy updated succesfully',
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

export async function DELETE(request: NextRequest, context: { params: { vacancy_id: string } }): Promise<NextResponse> {
  try {
    const { vacancy_id: vacancyId } = context.params;

    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
      include: {
        files: true,
      },
    });

    if (!vacancy) {
      return NextResponse.json(
        {
          message: 'Vacancy not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    await prisma.file.deleteMany({
      where: {
        vacancy_id: vacancyId,
      },
    });

    await prisma.vacancy.delete({
      where: {
        id: vacancyId,
      },
    });

    return NextResponse.json(
      {
        message: 'Vacancy deleted succesfully',
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

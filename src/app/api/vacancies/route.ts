import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type AddVacancyInterface } from './interfaces/add-vacancy-interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as AddVacancyInterface;
    const {
      title_ka: titleKa,
      title_eng: titleEng,
      description_ka: descriptionKa,
      description_eng: descriptionEng,
      pdf_ka: pdfKa,
      pdf_eng: pdfeng,
    } = data;

    const newVacancy = await prisma.vacancy.create({
      data: {
        description_eng: descriptionEng,
        description_ka: descriptionKa,
        title_eng: titleEng,
        title_ka: titleKa,
      },
    });

    if (pdfKa) {
      await prisma.file.create({
        data: {
          lang: 'ka',
          media_type: pdfKa.type,
          name: pdfKa.name,
          original_name: pdfKa.original_name,
          url: pdfKa.url,
          vacancy_id: newVacancy.id,
        },
      });
    }

    if (pdfeng) {
      await prisma.file.create({
        data: {
          lang: 'eng',
          media_type: pdfeng.type,
          name: pdfeng.name,
          original_name: pdfeng.original_name,
          url: pdfeng.url,
          vacancy_id: newVacancy.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: 'Vacancy created succesfully',
        success: true,
        data: newVacancy,
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

    const vacancies = await prisma.vacancy.findMany({
      take: Number(rowsPerPage),
      skip: (Number(page) - 1) * Number(rowsPerPage),
      include: {
        files: true,
      },
      orderBy: {
        [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
      },
    });

    const count = await prisma.vacancy.count();

    return NextResponse.json(
      {
        message: 'Vacancies fetched succesfully',
        data: vacancies,
        count,
        success: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log('Error:',e)
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

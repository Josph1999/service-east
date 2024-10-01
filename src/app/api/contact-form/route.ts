import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type AddContactformInterface } from './interfaces/add-contact-form.interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as AddContactformInterface;
    const { description, email, first_name: firstName, last_name: lastName, subject } = data;

    const newVacancy = await prisma.formSubmission.create({
      data: {
        description,
        description_eng: 'English description',
        email,
        first_name: firstName,
        last_name: lastName,
        subject,
      },
    });

    return NextResponse.json(
      {
        message: 'contact form created succesfully',
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

    const contactForm = await prisma.formSubmission.findMany({
      take: Number(rowsPerPage),
      skip: (Number(page) - 1) * Number(rowsPerPage),
      orderBy: {
        [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
      },
    });

    const count = await prisma.vacancy.count();

    return NextResponse.json(
      {
        message: 'Contact forms fetched succesfully',
        data: contactForm,
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

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type CreateAgendaInterface } from './interfaces/create-agenda.interface';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateAgendaInterface;

    const { agenda_name: agendaName, agenda_date: agendaDate } = data;

    const newAgenda = await prisma.agendaDate.create({
      data: {
        name: agendaName,
        date: new Date(agendaDate),
      },
    });

    return NextResponse.json(
      {
        message: 'Agenda created succesfully',
        success: true,
        data: newAgenda,
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

    const agendas = await prisma.agendaDate.findMany({
      include: {
        agenda: true,
      }
    });

    const count = await prisma.agendaDate.count();

    return NextResponse.json(
      {
        message: 'Agendas fetched succesfully',
        data: agendas,
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

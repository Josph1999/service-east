import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/prisma/prisma';

import { type CreateAgendaInfo } from '../interfaces/create-agenda.interface';

export async function POST(request: NextRequest, context: { params: { agenda_id: string } }): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateAgendaInfo;

    const {
      activity_eng: activityEng,
      activity_ka: activityKa,
      description_ka: descriptionKa,
      desctiption_eng: descriptionEng,
      location_eng: locationEng,
      location_ka: locationKa,
      time,
    } = data;

    const { agenda_id: agendaId } = context.params;

    const agendaDate = await prisma.agendaDate.findUnique({
      where: {
        id: agendaId,
      },
    });

    if (!agendaDate) {
      return NextResponse.json(
        {
          message: 'Agenda not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const newAgenda = await prisma.agenda.create({
      data: {
        activity_eng: activityEng,
        activity_ka: activityKa,
        description_eng: descriptionEng,
        description_ka: descriptionKa,
        location_eng: locationEng,
        location_ka: locationKa,
        time: new Date(time),
        agenda_date_id: agendaId,
      },
    });

    return NextResponse.json(
      {
        message: 'Agenda created succesfully',
        data: newAgenda,
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

export async function PATCH(request: NextRequest, context: { params: { agenda_id: string } }): Promise<NextResponse> {
  try {
    const data = (await request.json()) as unknown as CreateAgendaInfo;

    const {
      activity_eng: activityEng,
      activity_ka: activityKa,
      description_ka: descriptionKa,
      desctiption_eng: descriptionEng,
      location_eng: locationEng,
      location_ka: locationKa,
      time,
    } = data;

    const { agenda_id: agendaId } = context.params;

    const foundedAgenda = await prisma.agenda.findUnique({
      where: {
        id: agendaId,
      },
    });

    if (!foundedAgenda) {
      return NextResponse.json(
        {
          message: 'Agenda not found',
          success: true,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const updatedAgenda = await prisma.agenda.update({
      where: {
        id: agendaId,
      },
      data: {
        activity_eng: activityEng ? activityEng : foundedAgenda.activity_eng,
        activity_ka: activityKa ? activityKa : foundedAgenda.activity_ka,
        description_eng: descriptionEng ? descriptionEng : foundedAgenda.description_eng,
        description_ka: descriptionKa ? descriptionKa : foundedAgenda.description_ka,
        location_eng: locationEng ? locationEng : foundedAgenda.location_eng,
        location_ka: locationKa ? locationKa : foundedAgenda.location_ka,
        time: time ? new Date(time) : foundedAgenda.time,
      },
    });

    return NextResponse.json(
      {
        message: 'Agenda updated succesfully',
        data: updatedAgenda,
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

export async function GET(request: NextRequest, context: { params: { agenda_id: string } }): Promise<NextResponse> {
  try {
    const { agenda_id: agendaId } = context.params;

    const agenda = await prisma.agendaDate.findUnique({
      where: {
        id: agendaId,
      },
      include: {
        agenda: {
          orderBy: {
            time: 'asc',
          },
        },
      },
    });

    const count = await prisma.agendaDate.count();

    return NextResponse.json(
      {
        message: 'Agendas fetched succesfully',
        data: agenda,
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

export async function DELETE(request: NextRequest, context: { params: { agenda_id: string } }): Promise<NextResponse> {
  try {
    const { agenda_id: agendaId } = context.params;

    const agenda = await prisma.agenda.findUnique({
      where: {
        id: agendaId,
      },
    });

    if (!agenda) {
      return NextResponse.json(
        {
          message: 'Agenda not found',
          success: false,
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    await prisma.agenda.delete({
      where: {
        id: agendaId,
      },
    });

    return NextResponse.json(
      {
        message: 'Agendas fetched succesfully',
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

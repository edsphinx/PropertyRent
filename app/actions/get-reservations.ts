import prisma from '../libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async ({ listingId, userId, authorId }: IParams) => {
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservtions = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    })
    );

    return safeReservtions;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default getReservations;


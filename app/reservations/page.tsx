import EmptyState from '../components/empty-state';
import ClientOnly from '../components/client-only';

import getCurrentUser from '../actions/get-current-user';
import getReservations from '../actions/get-reservations';
import ReservationClient from './reservation-client';

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState
					title='Unauthorized'
					subtitle='Please login'
				/>
			</ClientOnly>
		);
	}

	const reservations = await getReservations({
		authorId: currentUser.id,
	});

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No reservations found'
					subtitle='Looks like you have no reservations on your properties'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ReservationsPage;

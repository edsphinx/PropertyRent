'use client';

import ClientOnly from '@/app/components/client-only';
import EmptyState from '@/app/components/empty-state';
import ListingHead from '@/app/components/listings/ListingHead';
import { categories } from '@/app/components/navbar/categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import Container from '@/app/components/container';
import { useMemo } from 'react';
import ListingInfo from '@/app/components/listings/listing-info';

interface ListingClientProps {
	reservations?: Reservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}
	return (
		<Container>
			<div className='max-w-screen-lg mx-auto'>
				<div className='flex flex-col gap-6'>
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;

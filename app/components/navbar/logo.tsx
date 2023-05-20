'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
	const router = useRouter();

	return (
		<Image
			priority={true}
			alt='Logo'
			className='hidden md:block cursor-pointer'
			style={{ width: 'auto', height: 'auto' }}
			height={100}
			width={100}
			src='/images/logo.png'
		/>
	);
};

export default Logo;

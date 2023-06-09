import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/navbar';
import ToasterProvider from './components/providers/toaster-provider';
import ClientOnly from './components/client-only';
import getCurrentUser from './actions/get-current-user';

import RegisterModal from './components/modals/register-modal';
import LoginModal from './components/modals/login-modal';
import RentModal from './components/modals/rent-modal';
import SearchModal from './components/modals/search-modal';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb Clone',
};

const font = Nunito({
	subsets: ['latin'],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const currentUser = await getCurrentUser();
	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModal />
					<RentModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	);
};

export default RootLayout;

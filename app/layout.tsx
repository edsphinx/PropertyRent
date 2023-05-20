import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/navbar';
import ClientOnly from './components/client-only';
import Modal from './components/modals/modal';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb Clone',
};

const font = Nunito({
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnly>
					<Modal
						actionLabel='Submit'
						title='Mensaje Prueba'
						isOpen
					/>
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}

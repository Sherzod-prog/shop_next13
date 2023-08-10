import Navbar from '@/components/navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/footer';

const roboto = Roboto({ subsets: ['latin'], display: 'swap', weight: '400' });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Navbar />
				<ToastContainer />
				{children}
				<Footer />
			</body>
		</html>
	);
}

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	return (
		<header className=' bg-gray-300 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<Link
					href={'/'}
					className='flex title-font font-medium items-center mb-4 md:mb-0'
				>
					<Image src={'/favicon.ico'} alt='icon' width={40} height={40} />
					<span className='ml-3 text-xl'>Tel shop</span>
				</Link>
				<nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
					<Link href={'/'} className='mr-5 '>
						Home
					</Link>
					<Link href={'/products'} className='mr-5 '>
						All produts
					</Link>
					<Link href={'/contacts'} className='mr-5 '>
						Contacts
					</Link>
				</nav>
				<Link href={'/shopping-cart'}>
					<button className='inline-flex items-center text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-500 hover:text-black hover:font-3 rounded text-base mx-1 mt-4 md:mt-0'>
						My bag
					</button>
				</Link>
			</div>
		</header>
	);
};

export default Navbar;

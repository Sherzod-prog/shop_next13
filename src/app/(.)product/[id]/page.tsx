'use client';

import { ProductType } from '@/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import CustomImage from '@/components/image';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(true);
	const [product, setProduct] = useState<ProductType>();

	const router = useRouter();

	const { id } = useParams();

	const handleClick = () => {
		const products: ProductType[] =
			JSON.parse(localStorage.getItem('carts') as string) || [];
		const isExistProduct = products.find(c => c.id === product?.id);

		if (isExistProduct) {
			const updateData = products.map(c => {
				if (c.id === product?.id) {
					return {
						...c,
						quantity: c.quantity + 1,
					};
				}
				return c;
			});
			localStorage.setItem('carts', JSON.stringify(updateData));
		} else {
			const data = [...products, { ...product, quantity: 1 }];
			localStorage.setItem('carts', JSON.stringify(data));
		}
		toast('Product add to your bag');
	};

	useEffect(() => {
		async function getData() {
			setLoading(true);
			const res = await fetch(`https://fakestoreapi.com/products/${id}`);
			const product = await res.json();
			setProduct(product);
			setLoading(false);
		}
		getData();
	}, [id]);

	return (
		<>
			<Dialog
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
					router.back();
				}}
				className='relative z-50'
			>
				<div className=' fixed inset-0 bg-black/30' area-hidden='true' />

				<div className=' fixed inset-0 overflow-y-auto'>
					<div className=' flex min-h-full items-center justify-center p-4'>
						<Dialog.Panel className={'mx-auto max-w-3xl rounded bg-white p-10'}>
							{loading ? (
								<div className='h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
							) : (
								<div className='flex gap-x-8 h-96'>
									{product?.image && (
										<div className=' relative w-72 h-full hidden md:inline'>
											<CustomImage product={product} fill />
										</div>
									)}
									<div className='flex-1 flex flex-col'>
										<div className='flex-1'>
											<h4 className=' font-semibold'>{product?.title}</h4>
											<p className='font-medium text-sm'>${product?.price}</p>
											<div>
												<div className=' flex items-center text-sm my-4'>
													<p>{product?.rating.rate}</p>
													{product?.rating.rate && (
														<div className='flex items-center ml-2 mr-6'>
															<ReactStars
																value={product.rating.rate}
																edit={false}
															/>
														</div>
													)}
													<p className=' text-blue-600 hover:underline cursor-pointer text-xs'>
														{' '}
														See all {product?.rating.count} reviews
													</p>
												</div>
											</div>
											<p className='line-clamp-5 text-sm'>
												{product?.description}
											</p>
										</div>
										<div className='space-y-3 text-sm'>
											<button
												onClick={handleClick}
												className='h-10 button w-full bg-blue-50  border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent'
											>
												Add to bag
											</button>
											<button
												onClick={() => window.location.reload()}
												className='h-10 button w-full bg-blue-100 border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent'
											>
												View full details
											</button>
										</div>
									</div>
								</div>
							)}
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ProductDetailPage;

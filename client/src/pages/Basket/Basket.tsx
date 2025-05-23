import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../types/store';
import type { AppDispatch } from '../../store';
import { fetchBasket, removeFromBasket } from '../../store/slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import type { BasketItem as BasketItemType } from '../../types/store';

// BasketItem component definition
const BasketItem = ({ item }: { item: BasketItemType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRemove = () => {
    dispatch(removeFromBasket(item.productId));
  };

  return (
    <div className='flex items-center border rounded-lg p-4 shadow-sm'>
      <img src={item.image} alt={item.name} className='w-24 h-24 object-contain mr-4' />
      <div className='flex-grow'>
        <h2 className='text-lg font-semibold'>{item.name}</h2>
        <div className='flex items-center gap-4'>
          <p className='text-xl font-bold'>${item.price}</p>
          <span className='text-gray-600'>x {item.quantity}</span>
          <p className='text-xl font-bold'>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
      >
        Remove
      </button>
    </div>
  );
};

export default function BasketPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state: RootState) => state.basket);

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const total = items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + price * quantity;
  }, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500 p-4'>
        <p>{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='text-center p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Shopping Basket</h2>
        <p className='text-gray-500 mb-4'>Your shopping basket is empty</p>
        <button
          onClick={handleBackToHome}
          className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-semibold mb-6'>Shopping Basket</h2>
      <div className='space-y-4'>
        {items.map((item) => (
          <BasketItem key={item.id} item={item} />
        ))}
      </div>
      <div className='mt-8 text-left'>
        <div className='text-xl font-semibold'>Total: ${total.toFixed(2)}</div>
        <button
          onClick={handleCheckout}
          className='mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors'
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

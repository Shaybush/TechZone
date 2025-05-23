import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../types/store';
import type { AppDispatch } from '../../store';
import type { Product } from '../../types/store';
import { fetchProducts } from '../../store/slices/productsSlice';
import { addToBasket } from '../../store/slices/basketSlice';

// ProductCard component definition
function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    setQuantity(newQuantity);
  };

  const handleAddToBasket = () => {
    if (quantity === 0) return;
    dispatch(addToBasket({ product, quantity }));
    setQuantity(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 flex flex-col h-full">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-contain mb-3"
        />
      )}
      <h3 className="text-lg font-semibold mb-2 text-left">{product.name}</h3>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="bg-blue-500 text-white w-8 h-8 rounded-full hover:bg-blue-600 flex items-center justify-center font-bold"
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="bg-blue-500 text-white w-8 h-8 rounded-full hover:bg-blue-600 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToBasket}
          disabled={quantity === 0}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div className="flex justify-center" key={product.id}>
            <div className="w-full max-w-sm">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

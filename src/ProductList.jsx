
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const categories = [
  {
    name: 'Air Purifying Plants',
    plants: [
      { id: 'snake', name: 'Snake Plant', cost: 15, image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg' },
      { id: 'spider', name: 'Spider Plant', cost: 12, image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg' },
      { id: 'peace', name: 'Peace Lily', cost: 18, image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg' },
      { id: 'fern', name: 'Boston Fern', cost: 20, image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg' },
      { id: 'rubber', name: 'Rubber Plant', cost: 17, image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg' },
      { id: 'aloe', name: 'Aloe Vera', cost: 14, image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg' }
    ]
  },
  {
    name: 'Aromatic Fragrant Plants',
    plants: [
      { id: 'lavender', name: 'Lavender', cost: 20, image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg' },
      { id: 'jasmine', name: 'Jasmine', cost: 18, image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=600' },
      { id: 'rosemary', name: 'Rosemary', cost: 15, image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg' },
      { id: 'mint', name: 'Mint', cost: 12, image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg' },
      { id: 'lemon-balm', name: 'Lemon Balm', cost: 14, image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg' },
      { id: 'hyacinth', name: 'Hyacinth', cost: 22, image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg' }
    ]
  },
  {
    name: 'Low Maintenance Plants',
    plants: [
      { id: 'zz', name: 'ZZ Plant', cost: 25, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=600' },
      { id: 'pothos', name: 'Pothos', cost: 10, image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg' },
      { id: 'cast-iron', name: 'Cast Iron Plant', cost: 20, image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg' },
      { id: 'succulent', name: 'Succulent', cost: 18, image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg' },
      { id: 'aglaonema', name: 'Aglaonema', cost: 22, image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg' },
      { id: 'marigold', name: 'Marigold', cost: 8, image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg' }
    ]
  }
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="plants-page">
      <header className="navbar">
        <h2>🌿 Paradise Nursery</h2>
        <nav>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('plants')}>Plants</button>
          <button onClick={() => onNavigate('cart')}>
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      <main className="product-grid">
        <h1>Our Plant Collection</h1>
        <p>Bring home greenery and create your own peaceful paradise.</p>

        {categories.map((category) => (
          <section className="plant-category" key={category.name}>
            <div className="plantname_heading">
              <h2 className="plant_heading">{category.name}</h2>
            </div>

            <div className="product-list">
              {category.plants.map((plant) => {
                const added = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article className="product-card" key={plant.id}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-price">
                      ₹{plant.cost.toFixed(2)}
                    </p>
                    <button
                      className={`product-button ${added ? 'added-to-cart' : ''}`}
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;

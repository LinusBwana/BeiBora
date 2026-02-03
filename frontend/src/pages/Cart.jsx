import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cart, loading, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    if (loading) {
        return <Container className="mt-4">Loading cart...</Container>;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <Container className="mt-4">
                <Card>
                    <Card.Body className="text-center">
                        <h3>Your cart is empty</h3>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/products')}
                            className="mt-3"
                        >
                            Continue Shopping
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            if (window.confirm('Remove this item from cart?')) {
                await removeItem(itemId);
            }
        } else {
            await updateQuantity(itemId, newQuantity);
        }
    };

    const handleRemove = async (itemId) => {
        if (window.confirm('Remove this item from cart?')) {
            await removeItem(itemId);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Shopping Cart</h1>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.product.image || '/placeholder.jpg'}
                                        alt={item.product.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <span>{item.product.name}</span>
                                </div>
                            </td>
                            <td>${item.product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, parseInt(e.target.value))
                                    }
                                    style={{ width: '60px' }}
                                />
                            </td>
                            <td>${item.subtotal}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Card className="mt-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Total: ${cart.total_price}</h4>
                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Cart;
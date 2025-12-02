import { 
  MapPin, Truck, CreditCard, Wallet, Building2, 
  ChevronRight, ShoppingBag, Tag, AlertCircle, Check, Edit2
} from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseFromCart, removeFromCart } from '../../redux/slice/cartSlice';


export const CheckoutLayout = ({children}) => {
    const dispatch = useDispatch();
    const { cartItems, cartTotalQuantity } = useSelector(state => state.cart);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 text-white">
            {children}
        </div>
    )
}
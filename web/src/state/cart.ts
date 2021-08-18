import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { availableDiscounts, Discount } from '../types/Discount';
import { Price } from '../types/Price';
import { getProductById, getProducts } from '../api/api';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  name: { [key: string]: string };
  brand: string;
  price: Price[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
  appliedDiscount: Discount | null;
  products: Product[] | null;
  loading: boolean;
  error: string | boolean;
}

const initialState: CartState = {
  items: [],
  appliedDiscount: null,
  products: null,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const productIdToAdd = action.payload.productId;
      const productAlreadyInCart = !!state.items.find(
        (product) => product.id === productIdToAdd,
      );

      if (productAlreadyInCart) {
        const items = state.items.map((product) => {
          if (product.id === productIdToAdd) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        return { ...state, items };
      }

      const prodToAdd = state.products?.find(
        (elem) => elem._id === productIdToAdd,
      );

      if (!prodToAdd) {
        return state;
      }

      const newCartItem: CartItem = {
        id: prodToAdd._id,
        quantity: 1,
        name: prodToAdd.name,
        brand: prodToAdd.brand,
        price: prodToAdd.price,
      };

      const items = [newCartItem, ...state.items];
      return { ...state, items };
    },
    removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const productIdToRemove = action.payload.productId;

      const items = state.items
        .map((product) =>
          product.id === productIdToRemove
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity !== 0);
      return { ...state, items };
    },
    addDiscount: (state, action: PayloadAction<{ code: string }>) => {
      const appliedDiscount =
        availableDiscounts.find(
          (discount) => discount.code === action.payload.code,
        ) ?? null;
      return { ...state, appliedDiscount };
    },
    fetchProductsStarted(state) {
      state.loading = true;
    },
    fetchProductsSuccess(
      state,
      action: PayloadAction<{ products: Product[] }>,
    ) {
      state.products = action.payload.products;
      state.loading = false;
    },
    fetchProductsFailed(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
      state.loading = false;
    },
    fetchProductStarted(state) {
      state.loading = true;
    },
    fetchProductSuccess(state, action: PayloadAction<{ product: Product }>) {
      state.products = state.products
        ? [...state.products, action.payload.product]
        : [action.payload.product];
      state.loading = false;
    },
    fetchProductFailed(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  removeProduct,
  addDiscount,
  fetchProductsStarted,
  fetchProductsSuccess,
  fetchProductsFailed,
  fetchProductStarted,
  fetchProductSuccess,
  fetchProductFailed,
} = cartSlice.actions;

export const fetchProducts = () => async (dispatch: Dispatch) => {
  dispatch(fetchProductsStarted());
  try {
    const products = await getProducts();
    dispatch(fetchProductsSuccess({ products }));
  } catch (err) {
    dispatch(fetchProductsFailed({ error: err.toString() }));
  }
};

export default cartSlice.reducer;

export const fetchProduct = (id: string) => async (dispatch: Dispatch) => {
  dispatch(fetchProductStarted());
  try {
    const product = await getProductById(id);
    dispatch(fetchProductSuccess({ product }));
  } catch (err) {
    dispatch(fetchProductFailed({ error: err.toString() }));
  }
};

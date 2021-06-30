import userEvent from '@testing-library/user-event';
import React from 'react';
import { getTestStore, render, screen } from 'test-utils';
import { addDiscount, CartItem } from '../../state/cart';
import { Currency } from '../../types/Currency';
import Delivery from '../Delivery';

const product: CartItem = {
    id: '123',
    brand: 'Szkoła testów',
    name: {
        pl: 'Kurs Testy na Frontendzie',
        en: 'Frontend tests'
    },
    price: [{ currency: Currency.USD, price: 5500 }],
    quantity: 1
};

const renderDeliveryRow = (currency: Currency) => {
    render(<Delivery/>, {
        value: { state: { selectedCurrency: currency } }
    });
}

describe('Delivery', () => {
    const store = getTestStore({
        cart: { items: [product], appliedDiscount: null },
    });

    it('has correct English title and shipping method labels', () => {
        render(<Delivery/>);

        const header = screen.getByText('Delivery');
        expect(header).toBeDefined();

        const expressDelivery = screen.getByText('Express delivery (1-2 days)');
        expect(expressDelivery).toBeDefined();

        const standardDelivery = screen.getByText('Standard delivery (3-4 days)');
        expect(standardDelivery).toBeDefined();
    });

    it.each`
        currency        | expected
        ${Currency.PLN} | ${'10 zł'}
        ${Currency.USD} | ${'2.68 $'}
        ${Currency.EUR} | ${'2.21 €'}
    `(
        'has correct Standard delivery price in $currency when that currency is selected',
        ({ currency, expected }) => {
            renderDeliveryRow(currency);
            expect(screen.getByTestId('standardDeliveryPrice')).toHaveTextContent(expected);
        }
    );

    it.each`
        currency        | expected
        ${Currency.PLN} | ${'25 zł'}
        ${Currency.USD} | ${'6.69 $'}
        ${Currency.EUR} | ${'5.52 €'}
    `(
    'has correct Express delivery price in $currency when that currency is selected',
    ({ currency, expected }) => {
            renderDeliveryRow(currency);
            expect(screen.getByTestId('expressDeliveryPrice')).toHaveTextContent(expected);
        }
    );

    it('has a free Standard delivery option when price >= 55 USD', () => {
        render(<Delivery/>, { store });

        expect(screen.getByTestId('standardDeliveryPrice')).toHaveTextContent('free');
    });

    it('has no free delivery option when price = 55 USD and discount is used', () => {
        render(<Delivery/>, { store });

        store.dispatch(addDiscount({ code: 'DLA_NAJLEPSZYCH' }));

        expect(screen.queryByText('free')).toBeNull();
    });

    it('has correct shipping method selected when user clicks one', () => {
        render(<Delivery/>);

        const expressDelivery = screen.getByLabelText('Express delivery (1-2 days)') as HTMLInputElement;
        const standardDelivery = screen.getByLabelText('Standard delivery (3-4 days)') as HTMLInputElement;

        expect(expressDelivery.checked).toBeTruthy();
        expect(standardDelivery.checked).toBeFalsy();

        userEvent.click(standardDelivery);

        expect(expressDelivery.checked).toBeFalsy();
        expect(standardDelivery.checked).toBeTruthy();
    });
});

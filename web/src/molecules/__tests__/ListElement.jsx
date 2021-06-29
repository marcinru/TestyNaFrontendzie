import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";

describe('ListElement', () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();

    const product = {
        id: '1',
        name: 't-shirt',
        price: 4999,
        quantity: 2
    }

    it('renders with a given name, price, quantity and total price', () => {
        render(<ListElement product={product} onAdd={onAddMock} onRemove={onRemoveMock}/>);

        const productName = screen.getByText(product.name);
        const price = screen.getAllByText('49.99zł');
        const quantity = screen.getByTestId('quantity');
        const total = screen.getAllByText('99.98zł');

        expect(productName).toBeInTheDocument();
        expect(price.length).toBe(1);
        expect(quantity).toHaveTextContent(product.quantity);
        expect(total.length).toBe(1);
    });

    it('calls onAdd callback when +1 button is clicked', () => {
        render(<ListElement product={product} onAdd={onAddMock} onRemove={onRemoveMock}/>);
        const addButton = screen.getByText('+1');

        user.click(addButton);

        expect(onAddMock).toBeCalledTimes(1);
    });

    it('calls onRemove callback when -1 button is clicked', () => {
        render(<ListElement product={product} onAdd={onAddMock} onRemove={onRemoveMock}/>);
        const removeButton = screen.getByText('-1');

        user.click(removeButton);

        expect(onRemoveMock).toBeCalledTimes(1);
    });
    
});

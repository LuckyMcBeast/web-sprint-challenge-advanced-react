import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>);
    expect(screen.getByRole('heading', {level : 2})).toHaveTextContent('Checkout Form');
});

test("form shows success message on submit with form details", () => {
    const rend = render(<CheckoutForm/>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('successMessage'));
    expect(screen.getByTestId('nameSuccess'));
    expect(screen.getByTestId('addressSuccess'));
    expect(screen.getByTestId('cityStateSuccess'));
});

test("form takes user input", () => {
    const rend = render(<CheckoutForm/>);
    const formValues = {
        firstName: rend.getByLabelText('First Name:'),
        lastName: rend.getByLabelText('Last Name:'),
        address: rend.getByLabelText('Address:'),
        city: rend.getByLabelText('City:'),
        state: rend.getByLabelText('State:'),
        zip: rend.getByLabelText('Zip:')
    };
    for (const property in formValues) {
        fireEvent.change(formValues[property], {target: {value: 'test'}})
        expect(formValues[property].value).toBe('test');
    }
});

import { getByTestId, render, queryByAttribute, screeen } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import {
   toBeInTheDocument,
   toHaveClass
} from '@testing-library/jest-dom'

import React from 'react';
import ReactDOM from 'react-dom';
//import TestHook from '../test_hook.js';
import { fireEvent, cleanup} from '@testing-library/react';

import Premiumcalc from './PremiumCalc';

describe("Premium Calc Component testing",()=>{
    it ("rendered User Name Button" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('username-input')
        fireEvent.change(input, {target: {value: '23'}})
        expect(input.value).toBe('23')
    });

    /*it ("rendered User DOB Button" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('userDOB-input')
        fireEvent.change(input, {target: {value: '20/05/1981'}})
        expect(input.value).toBe('20/05/1981')
    }); */

    /*it ("rendered User DOB Button" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('userDOB-input')
        fireEvent.change(input, {target: {value: '20/05/1981'}})
        expect(input.value).toBe('20/05/1981')
    });*/

    it ("rendered User DOB Button" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('usersumInsured-input')
        fireEvent.change(input, {target: {value: '40000'}})
        expect(input.value).toBe('40000')
    });

   /* test ("rendered Premium Calculate Button" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const calcButton = getByText("Calculate monthly premium");
        calcButton.s
        expect(calcButton).getById("calcButton").toBeTruthy();
    }); */

   /* test ("rendered User name Label" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const userNameLabel = getByText("User Name:");
        expect(userNameLabel).toBeInTheDocument();
    }); */

    /*it ("rendered Premium Calculate Button" , ()=>{
        const  dom = render(<Premiumcalc/>);
        const resetButton = getById(dom.container, 'resetButton');
        expect(resetButton).toBeTruthy();
    });*/

    it('should display the correct number of options', () => {
        const  { getAllByRole } = render(<Premiumcalc/>);
        expect(getAllByRole('option').length).toBe(6)
      })
});
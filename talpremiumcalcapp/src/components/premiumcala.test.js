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
    it ("rendered User Name text box" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('username-input')
        fireEvent.change(input, {target: {value: '23'}})
        expect(input.value).toBe('23')
    });

    it ("rendered User DOB date control" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('userDOB-input')
        fireEvent.change(input, {target: {value: '1981-05-12'}})
        expect(input.value).toBe('1981-05-12')
    }); 

    it ("rendered User Age population" , ()=>{
        const utils = render(<Premiumcalc />)
        const inputAge = utils.getByLabelText('userAge-input')
        const inputDOB = utils.getByLabelText('userDOB-input')
        fireEvent.change(inputDOB, {target: {value: '1981-05-12'}})
        expect(inputAge.value).toBe('41')
    }); 

    it ("rendered Sum insured text box" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('usersumInsured-input')
        fireEvent.change(input, {target: {value: '40000'}})
        expect(input.value).toBe('40000')
    });

    it ("rendered User Profession text box" , ()=>{
        const utils = render(<Premiumcalc />)
        const input = utils.getByLabelText('userProfession-input')
        fireEvent.change(input, {target: {value: 'Professional'}})
        expect(input.value).toBe('Professional')
    });

    /*test ("rendered Premium Calculate Button" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const calcButton = getByText("Reset");
        expect(calcButton).toBeTruthy();
    }); */

    it ("rendered Premium Calculation" , ()=>{
        const utils = render(<Premiumcalc />)
        const inputName = utils.getByLabelText('username-input')
        fireEvent.change(inputName, {target: {value: 'Shereena'}})
        
        const inputDOB = utils.getByLabelText('userDOB-input')
        fireEvent.change(inputDOB, {target: {value: '1981-05-12'}})
        
        const inputAge = utils.getByLabelText('userAge-input')
        fireEvent.change(inputAge, {target: {value: '40'}})
        
        const inputSumInsured = utils.getByLabelText('usersumInsured-input')
        fireEvent.change(inputSumInsured, {target: {value: '300000'}})
        
        const inpuProfession = utils.getByLabelText('userProfession-input')
        fireEvent.change(inpuProfession, {target: {value: 'Professional'}})
        
        //const submitButton = utils.getByLabelText('calcButton')
        const calcMonthlyPremium = utils.getByLabelText('monthlyPremium-result')
        //console.log(calcMonthlyPremium)
        //fireEvent.click(submitButton)
        expect(calcMonthlyPremium.textContent).toBe('147600') //Looks like it is not realistic value
    });
    /*
    test ("rendered User name Label" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const userNameLabel = getByText("User Name:");
        expect(userNameLabel).toBeInTheDocument();
    }); 
   
    it ("rendered Premium Calculate Button" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const resetButton = getByText("Reset");
        expect(resetButton).toBeTruthy();
    }); */

    it('should display the correct number of options', () => {
        const  { getAllByRole } = render(<Premiumcalc/>);
        expect(getAllByRole('option').length).toBe(6)
      })
});
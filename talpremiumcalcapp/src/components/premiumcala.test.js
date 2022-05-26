import { getByTestId, render, queryByAttribute } from "@testing-library/react";
import Premiumcalc from './PremiumCalc';

describe("Premiun Calc Component",()=>{

    const getById = queryByAttribute.bind(null, 'id');
    it ("rendered Rest Button" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const resetButton = getByText("Reset");
        expect(resetButton).toBeTruthy();
    });

    it ("rendered Premium Calculate Button" , ()=>{
        const  { getByText } = render(<Premiumcalc/>);
        const calcButton = getByText("Calculate monthly premium");
        expect(calcButton).toBeTruthy();
    });

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
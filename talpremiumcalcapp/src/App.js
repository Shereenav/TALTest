import logo from './logo.svg';
import './App.css';
import React, { useState,useDeferredValue, useEffect } from "react"

function App() {

  const initialValues = {userName:"",userAge:"",monthlyPremium:"",userDOB:"",userProfession:"",sumInsured:""};
  const [formValues, setFormValues] = useState(initialValues);
  
const options = [
  {
  label : "Cleaner",
  value : "Light Manual"
  },
  {
  label : "Doctor",
  value : "Professional"
  },
  {
  label : "Author",
  value : "White Collar"
  },
  {
  label : "Farmer",
  value : "Heavy Manual"
  },
  {
  label : "Mechanic",
  value : "Heavy Manual"
  },
  {
  label : "Florist",
  value : "Light Manual"
  },
  ];

  const occupationRatingMap = [ 
    {
      Rating : "Professional",
      Factor : "1.0"
    },
    {
      Rating : "White Collar",
      Factor : "1.25"
    },
    {
      Rating : "Light Manual",
      Factor : "1.50"
    },
    {
      Rating : "Heavy Manual",
      Factor : "1.75"
    }
  ];

 
  const handleChange = e => {
    const{name,value} = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })};

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("factor");
      //console.log(formValues.userProfession);
      //const filterObj = occupationRatingMap.find((e) => e.Rating == "Professional");
      const filterObj = occupationRatingMap.find((e) => e.Rating == formValues.userProfession);
      console.log(formValues.sumInsured);
      console.log(filterObj.Factor);
      console.log(formValues.userAge);
      console.log((formValues.sumInsured*filterObj.Factor*formValues.userAge));
      const calcValue = (formValues.sumInsured*filterObj.Factor*formValues.userAge)/1000*12;
      setFormValues({monthlyPremium:calcValue})
    };

    

  return (
    <div>
       <pre>{JSON.stringify(formValues,undefined,2)}</pre>
     <form onSubmit={handleSubmit}>
    <table align="center" cellpadding="0" cellspacing="0" border="0"> 
    <tr> 
    <td colspan="2"><label for="Calculate Premium"><b>Calculate Premium</b></label></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userName">User Name : &nbsp; &nbsp; </label></td>
    <td><input name="userName" id="userName" type="text"  value={formValues.userName} onChange={handleChange} /></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userAge">Age : &nbsp; &nbsp;  </label></td> <td> 
    <input name="userAge" id="userAge" type="text" value={formValues.userAge} onChange={handleChange} /></td> 
    </tr>
    <br/>
    <tr>
    <td><label for="userDOB">Date of Birth : &nbsp; &nbsp;  </label></td> <td>
    <input name='userDOB' type='date' value={formValues.userDOB} onChange={handleChange} /></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userOccupation">Occupation : &nbsp; &nbsp;  </label></td> <td>
    <select name="userProfession" onChange={handleChange} value={formValues.userProfession} >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
      </td>    </tr>  
      <br/>
      <tr>
    <td><label for="sumInsured">Death – Sum Insured:  &nbsp; &nbsp;  </label></td> <td>
    <input name='sumInsured' type='text' value={formValues.sumInsured} onChange={handleChange} /></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userInsuranceAmount"><b>Your monthly premium:  &nbsp; &nbsp;  </b></label></td> <td>
    <b><label for="monthlyPremium">{formValues.monthlyPremium}</label></b></td>
    </tr>
    <br></br>
    <tr> 
    <td align='center' colspan="2"><input type="submit" value="Calculate monthly premium"/></td> 
    </tr> 
    </table>
  </form>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, { useState,useDeferredValue, useEffect } from "react"

function App() {

  const initialValues = {userName:"",userAge:"",monthlyPremium:"",userDOB:"",userProfession:"",sumInsured:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit,setIsSubmit]=useState(false);
  
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

 const keepData = (formUpdatedValues) =>{
  setFormValues({...formUpdatedValues})
 };

  const handleChange = e => {
    const{name,value} = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })};

    const clearValues = (e) => {
      setFormValues(initialValues);
    };
    const handleSubmit = (e) => {
      //e.preventDefault();
      console.log("Form values");
      console.log(formValues);
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      console.log("Form errors");
      console.log(Object.keys(formErrors).length);
      console.log(isSubmit);
      if (Object.keys(formErrors).length === 0 )
      {
        console.log("I am in If")
      const filterObj = occupationRatingMap.find((e) => e.Rating == formValues.userProfession);
      const calcValue = (formValues.sumInsured*filterObj.Factor*formValues.userAge)/1000*12;
      setFormValues({monthlyPremium:calcValue})
      }
      else
      {
        console.log("I am not in If");
      }
      keepData(formValues);

    };

    useEffect(()=>{
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit)
      {
        console.log(formValues);
      }
    },[formErrors]);
    const validate = (formValues)=>{
      const errors = {}
      if(!formValues.userName)
      {
        errors.userName ="UserName is required";
      }
      if(!formValues.userAge)
      {
        errors.userAge ="Age is required";
      }
      
      if(!formValues.sumInsured)
      {
        errors.sumInsured ="Sum insured is required";
      }
      return errors;
    };

  return (
    <div>
       <pre>{JSON.stringify(formValues,undefined,2)}</pre>
     <form >
    <table align="center" cellpadding="0" cellspacing="0" border="0"> 
    <tr> 
    <td colspan="2"><label for="Calculate Premium"><b>Calculate Premium</b></label></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userName">User Name : &nbsp; &nbsp; </label></td>
    <td><input name="userName" id="userName" type="text"  value={formValues.userName} onChange={handleChange} /></td>
    <td class="error-message" >&nbsp; &nbsp;{formErrors.userName}</td>
    </tr>
    <br/>
    <tr>
    <td><label for="userAge">Age : &nbsp; &nbsp;  </label></td> <td> 
    <input name="userAge" id="userAge" type="text" value={formValues.userAge} onChange={handleChange} /></td> 
    <td class="error-message" > &nbsp; &nbsp;{formErrors.userAge}</td>
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
    <td class="error-message"  >&nbsp; &nbsp;{formErrors.sumInsured}</td>
    </tr>
    <br/>
    <tr>
    <td><label for="userInsuranceAmount"><b>Your monthly premium:  &nbsp; &nbsp;  </b></label></td> <td>
    <b><label for="monthlyPremium">{formValues.monthlyPremium}</label></b></td>
    </tr>
    <br></br>
    <tr> 
    <td align='center'><input type="button" value="Calculate monthly premium"  onClick={handleSubmit} /></td> 
    <td align='center'><input type="button" value="Reset"  onClick={clearValues} /></td> 
    </tr> 
    </table>
  </form>
    </div>
  );
}

export default App;

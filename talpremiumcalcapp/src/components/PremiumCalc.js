import logo from '../logo.svg';
import '../App.css';
import React, { useState,useDeferredValue, useEffect } from "react"

function Premiumcalc() {

  const initialValues = {userName:"",userAge:"",userDOB:"",userProfession:"Cleaner",sumInsured:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit,setIsSubmit]=useState(false);
  const [monthlyPremium,setMonthlyPremium]=useState("");
  
const options = [
  {
  label : "Cleaner",
  value : "Light Manual1",
  Rating : "Light Manual"
  },
  {
  label : "Doctor",
  value : "Professional",
  Rating : "Professional"
  },
  {
  label : "Author",
  value : "White Collar",
  Rating : "White Collar"
  },
  {
  label : "Farmer",
  value : "Heavy Manual1",
  Rating : "Heavy Manual"
  },
  {
  label : "Mechanic",
  value : "Heavy Manual2",
  Rating : "Heavy Manual"
  },
  {
  label : "Florist",
  value : "Light Manual2",
  Rating : "Light Manual"
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

 const GetAge = (dateString) =>
 {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age--;
  }
  return age;
 }
 const handleDOBChange = e => {
  var age = GetAge(e.target.value)
  const{name,value} = e.target
  setFormValues({
    ...formValues,
    [name]: value,"userAge": age

  })
 }
  const handleChange = e => {
    const{name,value} = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
    //setFormErrors(validate(formValues));
  };

    const clearValues = (e) => {
      setFormValues(initialValues);
      setMonthlyPremium("");
    };
    const CalculatePremium = (e) => {
      var temp = e.target.value;
    setFormValues({
      ...formValues,
      "userProfession": temp,
    })
      var errorList = validate(formValues);
      setFormErrors(errorList);
      setIsSubmit(true);
      if (Object.keys(errorList).length === 0 )
      {
      const filterObj1 = options.find((e) => e.value == temp);
      console.log(filterObj1.Rating);
      const filterObj = occupationRatingMap.find((e) => e.Rating == filterObj1.Rating);
      console.log(filterObj.Factor);
      const calcValue = (formValues.sumInsured*filterObj.Factor*formValues.userAge)/1000*12;
      setMonthlyPremium(calcValue)
      }
      else
      {
        setMonthlyPremium("");
      }
      //keepData(formValues);

    };

    useEffect(()=>{
      if (Object.keys(formErrors).length === 0 && isSubmit)
      {
        //console.log(formValues);
      }
    },[formErrors]); 
    const validate = (formValues)=>{
      const errors = {}
      if(formValues.userName ==="" )
      {
        errors.userName ="UserName is required";
      }
      if(formValues.sumInsured === "")
      {
        errors.sumInsured ="Sum insured is required";
      }
      if(formValues.userDOB === "")
      {
        errors.userDOB ="Date of birth is required";
      }
      if(formValues.userProfession ==="")
      {
        errors.userProfession ="Occupation is required";
      }
      return errors;
    };

  return (
    <div>
      
     <form >
    <table align="center" cellpadding="0" cellspacing="0" border="0"> 
    <tr> 
    <td colspan="2"><label for="Calculate Premium"><b>Calculate Monthly Premium</b></label></td>
    </tr>
    <br/>
    <tr>
    <td><label for="userName">User Name : &nbsp; &nbsp; </label></td>
    <td><input name="userName" id="userName" type="text"  value={formValues.userName} onChange={handleChange} aria-label="username-input"/ ></td>
    <td class="error-message" >&nbsp; &nbsp;{formErrors.userName}</td>
    </tr>
    <br/>
    <tr>
    <td><label for="userDOB">Date of Birth : &nbsp; &nbsp;  </label></td> <td>
    <input name='userDOB' type='date' value={formValues.userDOB} onChange={handleDOBChange} aria-label="userDOB-input" /></td>
    <td class="error-message" > &nbsp; &nbsp;{formErrors.userDOB}</td>
    </tr>
    <br/>
    <tr>
    <td><label for="userAge">Age : &nbsp; &nbsp;  </label></td> <td> 
    <input name="userAge" id="userAge" type="text" value={formValues.userAge} readonly aria-label="userAge-input"/></td> 
    </tr>
    
    <br/>
    
      <tr>
    <td><label for="sumInsured">Death – Sum Insured:  &nbsp; &nbsp;  </label></td> <td>
    <input name='sumInsured' type='text' value={formValues.sumInsured} onChange={handleChange}  aria-label="usersumInsured-input"/></td>
    <td class="error-message"  >&nbsp; &nbsp;{formErrors.sumInsured}</td>
    </tr>
    <br/>
    <tr>
    <td><label for="userOccupation">Occupation : &nbsp; &nbsp;  </label></td> <td>
    <select name="userProfession" onChange={CalculatePremium} value={formValues.userProfession} aria-label="userProfession-input" >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
      </td>  
      <td class="error-message" > &nbsp; &nbsp;{formErrors.userProfession}</td>
        </tr>  
      <br/>
    <tr>
    <td><label for="userInsuranceAmount"><b>Your monthly premium:  &nbsp; &nbsp;  </b></label></td> <td>
    <b><label for="monthlyPremium"  aria-label="monthlyPremium-result">{monthlyPremium}</label></b></td>
    </tr>
    
    </table>
  </form>
    </div>
  );
}

export default Premiumcalc;

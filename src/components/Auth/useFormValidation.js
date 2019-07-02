import React from 'react';

function useFormValidation(initialState,validate,authenticate) {
	const [ values, setValues ] = React.useState(initialState);
	const [errors,setErrors] =React.useState({})
	const [isSubmitting,setIsSubmitting] = React.useState(false)
const[touched,setTouched]=React.useState(false)
	React.useEffect(() => {
		if (isSubmitting) {
		  const noErrors = Object.keys(errors).length === 0;
		  if (noErrors) {
			authenticate();
			setIsSubmitting(false);
		  } else {
			setIsSubmitting(false);
		  }
		}
	  }, [errors,isSubmitting,authenticate]);

	function handleChange(e) {
		e.persist()
		if(e.target.name ==="password") setTouched(true)
		setValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value
		}));
	}
	function handleBlur(e){
		console.log(e.target.name,values)
		const validationErrors = validate(values,touched)
		setErrors(validationErrors)
	}
	function handleSubmit(e) {
		setIsSubmitting(true)
		
		e.preventDefault();
		const validationErrors = validate(values)
		setErrors(validationErrors)
		
		console.log({ values });
	}
	return { handleChange,handleBlur, handleSubmit, values,errors,isSubmitting };
}

export default useFormValidation;

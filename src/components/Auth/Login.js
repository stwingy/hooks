import React from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import {Link} from 'react-router-dom'
const INITIAL_STATE = {
	name: '',
	email: '',
	password: ''
};

function Login(props) {
	const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(
		INITIAL_STATE,
		validateLogin,
		authenticateUser
	);
	const [ login, setLogin ] = React.useState(true);
    const [firebaseError,setFirebaseError] = React.useState(null)
	async function authenticateUser() {
		const { name, email, password } = values;
		
		try {
			login ? await firebase.login(email, password) :await firebase.register(name, email, password);
			props.history.push("/")
		} catch (err) {
			console.error('auth error ',err)
			setFirebaseError(err.message)
		}
	}
	return (
		<div>
			<p className="lead">
				<i className="fas fa-user" /> {login ? 'Login' : 'Create Your Account'}
			</p>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					{!login && (
						<input
							value={values.name}
							onChange={handleChange}
							type="text"
							autoComplete="off"
							placeholder="Name"
							name="name"
							required
						/>
					)}
				</div>
				
				<div className="form-group">
				
					<input
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						type="email"
						className={errors.email && 'error-input'}
						autoComplete="off"
						placeholder="Email Address"
						name="email"
						required
					/>
					
					
				</div>
				
				<div className="form-group">
				
					<input
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						type="password"
						className={errors.password && 'error-input'}
						autoComplete="off"
						placeholder="Password"
						name="password"
						minLength="6"
					/>
					
				</div>
				<div className="flex mt3">
					<input
						type="submit"
						className="button pointer mr2"
						value={login ? 'Login' : 'Create'}
						disabled={isSubmitting}
						style={{ background: isSubmitting ? 'grey' : 'orange' }}
					/>
					<button type="button" className="pointer button" onClick={() => setLogin((prev) => !prev)}>
						{login ? 'Need to create an account?' : 'Already have an account?'}
					</button>
				</div>
			
			</form>
			<div style={{maxWidth:"500px"}}>
				
				<hr style={{marginTop:"2rem",marginBottom:"0px",border:"1px solid #ccc"}}/>
{errors.password && <p className="error-text">{errors.password}</p>}
{errors.email && <p className="error-text">{errors.email}</p>}
{firebaseError && <p className="error-text">{firebaseError}</p>}
 <hr style={{marginBottom:"2rem",marginTop:"0px",border:"1px solid #ccc"}}/>
			</div>
			<div className="forgot-password">
				<Link to ="/forgot">Forgot Password?</Link>
			</div>
		</div>
	);
}

export default Login;
// import React from "react";
// import useFormValidation from "./useFormValidation";
// import validateLogin from "./validateLogin";
// import firebase from "../../firebase";

// const INITIAL_STATE = {
//   name: "",
//   email: "",
//   password: ""
// };

// function Login(props) {
//   const {
//     handleSubmit,
//     handleBlur,
//     handleChange,
//     values,
//     errors,
//     isSubmitting
//   } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
//   const [login, setLogin] = React.useState(true);
//   const [firebaseError, setFirebaseError] = React.useState(null);

//   async function authenticateUser() {
//     const { name, email, password } = values;
//     try {
//       login
//         ? await firebase.login(email, password)
//         : await firebase.register(name, email, password);
//       props.history.push("/");
//     } catch (err) {
//       console.error("Authentication Error", err);
//       setFirebaseError(err.message);
//     }
//   }

//   return (
//     <div>
//       <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
//       <form onSubmit={handleSubmit} className="flex flex-column">
//         {!login && (
//           <input
//             onChange={handleChange}
//             value={values.name}
//             name="name"
//             type="text"
//             placeholder="Your name"
//             autoComplete="off"
//           />
//         )}
//         <input
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.email}
//           name="email"
//           type="email"
//           className={errors.email && "error-input"}
//           placeholder="Your email"
//           autoComplete="off"
//         />
//         {errors.email && <p className="error-text">{errors.email}</p>}
//         <input
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.password}
//           className={errors.password && "error-input"}
//           name="password"
//           type="password"
//           placeholder="Choose a secure password"
//         />
//         {errors.password && <p className="error-text">{errors.password}</p>}
//         {firebaseError && <p className="error-text">{firebaseError}</p>}
//         <div className="flex mt3">
//           <button
//             type="submit"
//             className="button pointer mr2"
//             disabled={isSubmitting}
//             style={{ background: isSubmitting ? "grey" : "orange" }}
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             className="pointer button"
//             onClick={() => setLogin(prevLogin => !prevLogin)}
//           >
//             {login ? "need to create an account?" : "already have an account?"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
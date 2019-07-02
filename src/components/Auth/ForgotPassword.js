import React from 'react';
import firebaseContext from '../../firebase/context'
function ForgotPassword() {

  const {firebase} = React.useContext(firebaseContext)
  console.log(firebase)
  const[resetPasswordEmail,setResetPasswordEmail] = React.useState("")
  const [isPasswordReset,setIsPasswordReset] = React.useState(false)
  const [passwordResetError,setPasswordResetError] = React.useState(null)

  async function handleResetPassword(){
try {
  await firebase.resetPassword(resetPasswordEmail)
  setIsPasswordReset(true)
  setPasswordResetError(null)
} catch (err) {
  console.error("Error sending message ",err)
  setPasswordResetError(err.message)
  setIsPasswordReset(false)
}
  }
	return (
		<div>
      <input
       type="email" 
       className="input" 
       placeholder = "Provide your account email"
       onChange ={e=>setResetPasswordEmail(e.target.value)}/>
      <div>
        <button
         className="button"
         onClick ={handleResetPassword}
         >
           Reset Password
           </button>
           {isPasswordReset && <p>Check email to rest password.</p>}
           {passwordResetError && <p className="error-text">{passwordResetError}</p>}
      </div>
		</div>
	);
}

export default ForgotPassword;

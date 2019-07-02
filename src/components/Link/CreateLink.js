import React from "react";
import useFormValidation from '../Auth/useFormValidation'  
import validateCreateLink from '../Auth/validateCreateLink'
import {firebaseContext} from '../../firebase'
const INITIALSTATE ={
    description:'',
    url:''
}

function CreateLink(props) {

 const {handleSubmit,handleChange,values,errors}= useFormValidation(INITIALSTATE,validateCreateLink,handleCreateLink)
const {firebase,user} = React.useContext(firebaseContext)
function handleCreateLink(){
  if(!user){
    props.history.push('/login')
  }else{
    const {url,description} = values
    const newLink = {
      url,
      description,
      postedBy:{
        id:user.uid,
        name:user.displayName
      },
      voteCount:0,
      votes:[],
      comments:[],
      created:Date.now()
    }
    firebase.db.collection("links").add(newLink)
    props.history.push('/')
  }
}

  return (
    <form className = 'flex flex-column mt3'onSubmit = {handleSubmit}>
      <input
      onChange ={handleChange}
      value = {values.description}
      name = 'description'
      type = 'text'
      placeholder='A description of your link'
      autoComplete='off'
      className ={errors.description && 'error-input'}
      />
      {errors.description && <p className = 'error-text'>{errors.description}</p>}
       <input
        onChange ={handleChange}
        value = {values.url}
      name = 'url'
      type = 'url'
      placeholder='The URL of your link'
      autoComplete='off'
      className ={errors.url && 'error-input'}
      />
      {errors.url && <p className = 'error-text'>{errors.url}</p>}
      <button className ="button" type ="submit">
        Submit
      </button>
    </form>
  )
}

export default CreateLink;

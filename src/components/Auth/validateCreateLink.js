export default function validateCreateLink(values) {
    let errors ={}
//description errors
    if (!values.description) {
        errors.description = "description required";
      } else if (values.description.length<10) {
        errors.description = "Description length must be longer";
      }
      // url Errors
     
      if (!values.url) {
        errors.url = "URL required";
      } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = "Invalid URL";
      }
    
    return errors
}

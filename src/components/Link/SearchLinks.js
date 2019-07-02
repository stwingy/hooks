import React from "react";
import linkItem from './LinkItem'
import firebaseContext from '../../firebase/context'
import LinkItem from "./LinkItem";
function SearchLinks() {
  const [filter,setFilter] = React.useState("")
  const [filteredLinks,setFilteredLinks] = React.useState([])
  const [links,setLinks] = React.useState([])
const {firebase } = React.useContext(firebaseContext)
  React.useEffect(()=>{
getInitialLinks()
  },[])
  function getInitialLinks(){
firebase.db.collection('links').get().then(snapshot=>{
  const links =snapshot.docs.map(doc=>{
    return {id:doc.id,...doc.data()}
  })
  setLinks(links)
})
  }

const handleSearch =(e)=>{
  e.preventDefault()
  const query =filter.toLowerCase()
  const matchedLinks =links.filter(link=>{
    return link.description.toLowerCase().includes(query) ||
    link.url.toLowerCase().includes(query) ||
    link.postedBy.name.toLowerCase().includes(query)
  })
setFilteredLinks(matchedLinks)
}
  return (
    <div>
 <form onSubmit = {handleSearch}>
      <div>
        Search <input onChange ={e=>setFilter(e.target.value)}/>
        <button>OK</button>
      </div>
    </form>
    {filteredLinks.map((fL,index)=>(
      <LinkItem key ={fL.id} showCount={false} link={fL} index={index}/>
    ))}
    </div>
   
  )
}

export default SearchLinks;

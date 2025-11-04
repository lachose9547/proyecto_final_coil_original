import { Link } from "react-router-dom"
export const Nav = () => {
  return (
    <ul>
  
     <li><Link to="/home">Home</Link></li>
       <li><Link to="/">Login</Link></li>
     </ul>
  )
}

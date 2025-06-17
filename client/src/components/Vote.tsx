import '../styles/Vote.css'
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";



function Vote({vote_count}: {vote_count : number}) {
  return (
    <div className='Vote'>
        <LuArrowBigUp/>
            {vote_count}
        <LuArrowBigDown/>
    </div>
  )
}

export default Vote
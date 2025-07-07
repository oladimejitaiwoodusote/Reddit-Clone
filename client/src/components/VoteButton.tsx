import '../styles/VoteButton.css'
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";

function VoteButton({vote_count}: {vote_count : number}) {
  return (
    <div className='Vote'>
        <LuArrowBigUp/>
            {vote_count}
        <LuArrowBigDown/>
    </div>
  )
}

export default VoteButton
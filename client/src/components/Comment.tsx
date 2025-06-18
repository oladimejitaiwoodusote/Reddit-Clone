import '../styles/Comment.css'
import { FaRegComment } from "react-icons/fa";

function Comment({comment_count}: {comment_count: number}) {
  return (
    <div className="Comment">
        <FaRegComment/>
        {comment_count}
    </div>
  )
}

export default Comment
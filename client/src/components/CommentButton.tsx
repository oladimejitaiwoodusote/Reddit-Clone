import '../styles/CommentButton.css'
import { FaRegComment } from "react-icons/fa";

function CommentButton({comment_count}: {comment_count: number}) {
  return (
    <div className="Comment">
        <FaRegComment/>
        {comment_count}
    </div>
  )
}

export default CommentButton
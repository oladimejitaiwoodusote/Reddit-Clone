export interface CommentData {
    id: number;
    user_name: string;
    user_avatar: string;
    time: string;
    content: string;
    vote_count: number;
    user_vote?: "up" | "down" | null;
  }

  export interface SubredditData {
    id: number;
    name: string;
    avatar: string;
    member_count: number;
    wallpaper: string;
    description: string;
}

export interface PostData{
  id: number,
  subreddit_avatar: string,
  subreddit_name: string,
  time: string,
  title: string,
  user_name: string,
  media?: string,
  content?: string,
  vote_count: number,
  comment_count: number
  user_vote: "up" | "down" | null
}
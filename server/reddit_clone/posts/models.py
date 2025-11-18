from reddit_clone import db
from datetime import datetime
from sqlalchemy.orm import joinedload


class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.Text, nullable = False)
    content = db.Column(db.Text)
    media = db.Column(db.Text)   

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"))
    
    user = db.relationship("User", back_populates=("posts"))
    subreddit = db.relationship("Subreddit", back_populates = ("posts"))
    comments = db.relationship("Comment", back_populates=("post"), cascade= "all, delete-orphan")
    post_votes = db.relationship("PostVote", back_populates=("post"), cascade = "all, delete-orphan")

    def get_score(self):
        return sum(1 if v.is_upvote else -1 for v in self.post_votes)

    #init method
    def __init__(self, title, content = None, media = None, user_id = None, subreddit_id = None):
        self.title = title
        self.content = content
        self.media = media
        self.user_id = user_id
        self.subreddit_id = subreddit_id

    #to dict
    def to_dict(self, current_user = None):
        now = datetime.utcnow()
        time_str = None

        if self.created_at:
            delta = now - self.created_at
            seconds = delta.total_seconds()
            hours = seconds // 3600
            days = seconds // (3600 * 24)
            months = seconds // (3600 * 24 * 30)
            years = seconds // (3600 * 24 * 365)

            if hours < 24:
                time_str = f"{int(hours)} hr. ago"
            elif days < 30:
                time_str = f"{int(days)} day{'s' if days!= 1 else ''} ago"
            elif months < 12:
                time_str = f"{int(months)} month{'s' if months != 1 else ''} ago"
            else:
                time_str = f"{int(years)} year{'s' if years != 1 else ''} ago"


        user_vote = None
        if current_user and current_user.is_authenticated:
            vote = next((v for v in self.post_votes if v.user_id == current_user.id), None)
            if vote:
                user_vote = "up" if vote.is_upvote else "down"
        
        return ({
            "id": self.id,
            "subreddit_avatar": self.subreddit.avatar,
            "subreddit_name": self.subreddit.name,
            "subreddit_id": self.subreddit.id,
            "user_name": self.user.username,
            "title": self.title,
            "content": self.content,
            "media": self.media,
            "vote_count": self.get_score(),
            "comment_count": len(self.comments),
            "time": time_str,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
            "user_vote": user_vote
        })
        
    #create posts
    @classmethod
    def create_post(cls, form_data, user_id):        
        post = Post(
            title = form_data["title"],
            content = form_data.get("content"),
            media = form_data.get("media"),
            subreddit_id = form_data.get("subreddit_id"),
            user_id = user_id,
        )

        db.session.add(post)
        db.session.commit()
        return post

    #delete posts
    def delete_post(self):
        db.session.delete(self)
        db.session.commit()

    #edit post
    def patch_post(self, form_data):       
        if "title" in form_data:
            self.title = form_data["title"]
        
        if "content" in form_data:
            self.content = form_data["content"]

        if "media" in form_data:
            self.media = form_data["media"]

        db.session.commit()
        return self

    #Get All Posts Ordered by newest(Home Page)
    @classmethod
    def get_posts_by_new(cls):
        posts = Post.query.order_by(Post.created_at.desc()).all()
        return posts

    #Get All Posts Ordered by popularity (Popular Page)
    @classmethod
    def get_posts_by_popularity(cls):
        posts = Post.query.all()
        return sorted(posts, key=lambda post: post.get_score(), reverse=True)


    #Get Single Post
    @classmethod
    def get_post(cls, id):
        post = Post.query.get(id)
        return post

    #Get Posts Comments
    @classmethod
    def get_post_comments(cls, id):
        post = Post.query.get(id)
        return post.comments


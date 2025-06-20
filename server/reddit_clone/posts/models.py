from reddit_clone import db
from datetime import datetime

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

    #init method
    def __init__(self, title, content = None, media = None, user_id = None, subreddit_id = None):
        self.title = title
        self.content = content
        self.media = media
        self.user_id = user_id
        self.subreddit_id = subreddit_id

    #to dict
    def to_dict(self):
        now = datetime.utcnow()
        hours_ago = None
        if self.created_at:
            delta = now - self.created_at
            hours_ago = int(delta.total_seconds() // 3600)


        return ({
            "id": self.id,
            "subreddit_avatar": self.subreddit.avatar,
            "subreddit_name": self.subreddit.name,
            "title": self.title,
            "content": self.content,
            "media": self.media,
            "vote_count": sum(1 if vote.is_upvote else -1 for vote in self.post_votes),
            "comment_count": len(self.comments),
            "time": hours_ago,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
        })
        
    #create posts
    @classmethod
    def create_post(cls, form_data, user_id, subreddit_id ):
        post = Post(
            title = form_data["title"],
            content = form_data.get("content"),
            media = form_data.get("media"),
            user_id = user_id,
            subreddit_id = subreddit_id
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

    #Get All Posts
    @classmethod
    def get_posts(cls):
        posts = Post.query.all()
        return posts
from reddit_clone import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    text = db.Column (db.String, nullable = False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    user = db.relationship("User", back_populates = ("comments"))
    post = db.relationship("Post", back_populates = ("comments"))
    comment_votes = db.relationship("CommentVote", back_populates = ("comment"), cascade= "all, delete-orphan")

    def __init__(self, text, user_id = None, post_id = None):
        self.text = text
        self.user_id = user_id
        self.post_id = post_id

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
            vote = next((v for v in self.comment_votes if v.user_id == current_user.id), None)
            if vote:
                user_vote = "up" if vote.is_upvote else "down"

        return ({
            "id": self.id,
            "content": self.text,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
            "user_name": self.user.username,
            "user_avatar": self.user.avatar,
            "post_id": self.post_id,
            "vote_count": sum(1 if vote.is_upvote else -1 for vote in self.comment_votes),
            "time": time_str,
            "user_vote": user_vote
        })

    #create comment
    @classmethod
    def create_comment(cls, form_data, user_id, post_id):
        comment = Comment(
            text= form_data["text"],
            user_id = user_id,
            post_id = post_id
        )
        db.session.add(comment)
        db.session.commit()
        return comment

    #delete comment
    def delete_comment(self):
        db.session.delete(self)
        db.session.commit()

    #edit comment
    def patch_comment(self, form_data):
        self.text = form_data["text"]
        db.session.commit()
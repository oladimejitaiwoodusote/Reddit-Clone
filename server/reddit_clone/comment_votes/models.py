from reddit_clone import db

class CommentVote(db.Model):
    __tablename__ = "comment_votes"

    id = db.Column(db.Integer, primary_key = True)
    is_upvote = db.Column(db.Boolean, nullable = False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))

    user = db.relationship("User", back_populates = "comment_votes")
    comment = db.relationship("Comment", back_populates = "comment_votes")

    def __init__(self, is_upvote, user_id = None, comment_id = None):
        self.is_upvote = is_upvote
        self.user_id = user_id
        self.comment_id = comment_id

    def to_dict(self):
        return ({
            "id": self.id,
            "is_upvote": self.is_upvote,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
            "comment_id": self.comment_id
        })

    #Create comment vote
    @classmethod
    def create_comment_vote(cls, form_data, user_id, comment_id):
        is_upvote = form_data.get("is_upvote")

        if is_upvote is None:
            return {"error": "is_upvote is required and must be true or false"}

        existing_vote = cls.query.filter_by(user_id = user_id, comment_id = comment_id).first()
        if existing_vote:
            return None

        comment_vote = CommentVote(
            is_upvote= form_data["is_upvote"],
            user_id=user_id,
            comment_id=comment_id
        )
        db.session.add(comment_vote)
        db.session.commit()
        return comment_vote

    #Delete comment vote
    def delete_comment_vote(self):
        db.session.delete(self)
        db.session.commit()

    #Edit comment vote
    def patch_comment_vote(self):
        self.is_upvote = not self.is_upvote
        db.session.commit()

    
    
        
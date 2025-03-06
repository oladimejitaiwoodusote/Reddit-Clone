from reddit_clone import db

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

    def __init__(self, text, user_id = None, post_id = None):
        self.text = text
        self.user_id = user_id
        self.post_id = post_id

    def to_dict(self):
        return ({
            "id": self.id,
            "text": self.text,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
            "post_id": self.post_id
        })

    #create comment
    @classmethod
    def create_comment(cls, form_data, user_id, post_id):
        new_comment = Comment(
            text= form_data["text"],
            user_id = user_id,
            post_id = post_id
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment

    #delete comment
    def delete_comment(self):
        db.session.delete(self)
        db.session.commit()

    #edit comment
    def patch_comment(self, form_data):
        self.text = form_data["text"]
        db.session.commit()
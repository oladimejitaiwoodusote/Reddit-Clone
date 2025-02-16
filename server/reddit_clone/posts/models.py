from reddit_clone import db
from flask import jsonify

class Post(db.Model):

    #Update User for Posts relationship

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.Text, nullable = False)
    content = db.Column(db.Text)
    media = db.Column(db.Text)   

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
    user = db.relationship("User", back_populates=("posts"))

    #init method
    #to dict
    #get post
    #create posts
    #delete posts
    #edit post

    def __init__(self, title):
        self.title = title

    def to_dict(self):
        return ({
            "title": self.title,
            "content": self.content,
            "media": self.media,
        })

    @classmethod
    def create_post(cls, form_data ):
        new_post = Post(
            title = form_data["title"],
            content = form_data["content"],
            media = form_data["media"],
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post

    def delete_post(self):
        db.session.delete(self)
        db.session.commit()

    def edit_post(self, form_data, id):
        2
        post = Post.query.get(id)
        

    

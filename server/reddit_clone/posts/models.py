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

from reddit_clone import db

class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.Text, nullable = False)
    content = db.Column(db.Text)
    media = db.Column(db.Text)   

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
    
    user = db.relationship("User", back_populates=("posts"))
    comments = db.relationship("Comment", back_populates=("post"), cascade= "all, delete-orphan")

    #init method
    def __init__(self, title, content = None, media = None, user_id = None):
        self.title = title
        self.content = content
        self.media = media
        self.user_id = user_id

    #to dict
    def to_dict(self):
        return ({
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "media": self.media,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user_id": self.user_id,
        })
        
    #create posts
    @classmethod
    def create_post(cls, form_data, user_id ):
        post = Post(
            title = form_data["title"],
            content = form_data.get("content"),
            media = form_data.get("media"),
            user_id = user_id
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
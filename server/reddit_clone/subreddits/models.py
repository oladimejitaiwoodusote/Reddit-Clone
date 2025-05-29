from reddit_clone import db

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text, nullable = False)
    description = db.Column(db.Text)
    default_avatar_url = "https://storage.googleapis.com/instagram-clone/Empty%20Avatar.jpeg"
    avatar = db.Column(db.String, default=default_avatar_url)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    posts = db.relationship("Post", back_populates = ("subreddit"), cascade = "all, delete-orphan")
    subscriptions = db.relationship("Subscription", back_populates = ("subreddit"), cascade = "all, delete-orphan")

    def __init__(self, name, description = None):
        self.name = name
        self.description = description

    def to_dict(self):
        return ({
            "id": self.id,
            "name": self.name,
            "default_avatar_url": self.default_avatar_url,
            "avatar": self.avatar,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        })

    #Create Subreddit
    @classmethod
    def create_subreddit(cls, form_data):
        subreddit = Subreddit(
            name = form_data["name"],
            description= form_data["description"]
        )

        db.session.add(subreddit)
        db.session.commit()
        return subreddit

    #Delete Subreddit
    #Apparently Subreddit's cant be deleted once created, lucky me :)

    #Edit Subreddit
    #Apparently can only edit the description and not name of subreddit
    def patch_subreddit(self, form_data):
        #self.description = form_data["description"]
        if "description" in form_data:
            self.description = form_data["description"]

        if "avatar" in form_data:
            self.avatar = form_data["avatar"]

        db.session.commit()
        return self

    #Get All Subreddits
    @classmethod
    def get_subreddits(cls):
        subreddits = Subreddit.query.all()
        return subreddits
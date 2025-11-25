from reddit_clone import db

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text, nullable = False, unique=True)
    description = db.Column(db.Text)
    default_avatar_url = "https://storage.googleapis.com/instagram-clone/Empty%20Avatar.jpeg"
    avatar = db.Column(db.String, default=default_avatar_url)
    wallpaper = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    posts = db.relationship("Post", back_populates = ("subreddit"), cascade = "all, delete-orphan", lazy = "dynamic")
    subscriptions = db.relationship("Subscription", back_populates = ("subreddit"), cascade = "all, delete-orphan")

    def __init__(self, name, wallpaper, description = None, avatar = None):
        self.name = name
        self.description = description
        self.wallpaper = wallpaper
        self.avatar = avatar or self.default_avatar_url

    def to_dict(self):
        return ({
            "id": self.id,
            "name": self.name,
            "avatar": self.avatar,
            "wallpaper": self.wallpaper,
            "description": self.description,
            "member_count": len(self.subscriptions),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        })

    #Create Subreddit
    @classmethod
    def create_subreddit(cls, form_data):
        avatar = form_data.get("avatar") or cls.default_avatar_url

        subreddit = Subreddit(
            name = form_data["name"],
            description= form_data["description"],
            wallpaper=form_data["wallpaper"],
            avatar = avatar
        )

        db.session.add(subreddit)
        db.session.commit()
        return subreddit

    #Get All Subreddits
    @classmethod
    def get_subreddits(cls):
        subreddits = Subreddit.query.all()
        return subreddits

    #Get Individual Subreddit
    @classmethod
    def get_subreddit(cls, name):
        subreddit = Subreddit.query.filter_by(name=name).first()
        return subreddit

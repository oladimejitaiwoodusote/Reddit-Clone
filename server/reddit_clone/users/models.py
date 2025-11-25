from reddit_clone import db, bcrypt, login_manager
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

#Model and Methods
class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key= True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    full_name = db.Column(db.String, nullable = False)
    username = db.Column(db.String(80), unique =True, nullable = False)
    password_hash = db.Column(db.Text, nullable = False)
    default_avatar_url = "https://storage.googleapis.com/instagram-clone/Empty%20Avatar.jpeg"
    avatar = db.Column (db.String, default= default_avatar_url)
    bio = db.Column (db.Text)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    posts = db.relationship("Post", back_populates=("user"), cascade= "all, delete-orphan")
    comments = db.relationship("Comment", back_populates = ("user"), cascade= "all, delete-orphan")
    comment_votes = db.relationship("CommentVote", back_populates = ("user"), cascade= "all, delete-orphan")
    post_votes = db.relationship("PostVote", back_populates = ("user"), cascade = "all, delete-orphan")
    subscriptions = db.relationship("Subscription", back_populates = ("user"), cascade = "all, delete-orphan")


    def __init__(self, username, email, full_name, password_hash, avatar=None):
        self.username = username
        self.email = email
        self.full_name = full_name
        self.password_hash = password_hash
        self.avatar = avatar or self.default_avatar_url

    def to_dict(self):
        return (
            {
                "id": self.id,
                "email": self.email,
                "full_name": self.full_name,
                "username": self.username,
                "avatar": self.avatar,
                "bio": self.bio
            }
        )
    
    #Get User
    def get_user(self, id):
        user = User.query.get(id)
        if user:
            return user.to_dict()
        return None

    #Authenticate User/Login
    @classmethod
    def authenticate(cls, form_data):
        identifier = form_data["identifier"]
        password = form_data["password"]

        user = cls.query.filter(
            or_(
                cls.username == identifier, 
                cls.email == identifier
            )            
        ).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            return user
        return None

    #Create User
    @classmethod
    def create_user(cls, form_data):
        avatar = form_data.get("avatar") or cls.default_avatar_url

        user = User(
            email = form_data["email"],
            full_name = form_data["full_name"],
            avatar=avatar,
            username= form_data["username"],
            password_hash = bcrypt.generate_password_hash(form_data["password"]).decode('utf-8')
        )

        db.session.add(user)
        try:
            db.session.commit()
            return user
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Username or Email already exists")


    #Update/Patch User
    #Finish after storage is setup
    def patch_user(self, form_data):
        if "email" in form_data:
            self.email = form_data["email"]

        if "full_name" in form_data:
            self.full_name = form_data["full_name"]

        if "avatar" in form_data:
            self.avatar = form_data["avatar"]

        if "bio" in form_data:
            self.bio = form_data["bio"]

        #Handling Password
        if "new_password" in form_data:
            current_password = form_data.get("current_password")
            new_password = form_data["new_password"]

            if not current_password:
                raise ValueError("Current password is required to change password.")

            if not bcrypt.check_password_hash(self.password_hash, current_password):
                raise ValueError("Password incorrect")

            if len(new_password) < 8:
                raise ValueError("New password must be at least 8 characters long")

            self.password_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')

        db.session.commit()
        return self

    #Methods for flask_login
    #is_authenticated
    @property
    def is_authenticated(self):
        return True

    #is_active
    @property
    def is_active(self):
        return True

    #is_anonymous
    @property
    def is_anonymous(self):
        return False

    #get_id
    def get_id(self):
        return str(self.id)
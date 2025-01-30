from reddit_clone import db, bcrypt, login_manager
from flask import jsonify


@login_manager.user_loader()
def load_user(user_id):
    return User.get(user_id)


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

    #methods needed
    #Get user profile
    #create user account
    #update/patch user account
    #delete user account
    #login 
    #logout

    def __init__(self, username, email, fullname):
        self.username = username
        self.email = email
        self.full_name = fullname

    def to_dict(self):
        return (
            {
                "email": self.email,
                "full_name": self.full_name,
                "username": self.username,
                "default_avatar_url": self.default_avatar_url,
                "avatar": self.avatar,
                "bio": self.bio
            }
        )
    
    #Get User
    def get_user(self, id):
        user = User.query.get(id)
        if user:
            return jsonify(user.to_dict())

    #Authenticate User/Login
    @classmethod
    def authenticate(cls, username, password_hash):
        user = cls.query.filter(username=username)
        if user and bcrypt.check_password_hash(user.password_hash, password_hash):
            return user
        return None

    #Create User
    @classmethod
    def create_user(cls, form_data):
        new_user = User(
            email = form_data["email"],
            full_name = form_data["full_name"],
            username= form_data["username"],
            password_hash = bcrypt.generate_password_hash(form_data["password_hash"]).decode('utf-8')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict())

    #Update/Patch User
    #Finish after storage is setup
    def patch_user(self, form_data, id):
        current_user = User.query.get(id)
        #not done!

    #Delete User
    def delete_user(self, id):
        current_user = User.query.get(id)
        db.session.delete(current_user)
        db.session.commit()

    #Methods for flask_login
    #get_id()

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
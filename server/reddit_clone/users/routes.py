from reddit_clone.users.models import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
import cloudinary
from cloudinary import uploader

users = Blueprint("users", __name__)

#Login
@users.post("/user/login")
def user_login():
    if current_user.is_authenticated:
        return jsonify({
            "message": "User already loged in"
        }), 200

    json = request.json
    user = User.authenticate(json)
    if user:
        login_user(user)
        return jsonify(user.to_dict()), 200
    return jsonify({"message": "Invalid username or password"}), 409

#Get current user/ Check Session
@users.get("/user/me")
def get_current_user():
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict()), 200
    return jsonify({"message": "Not logged in"}), 401
    
#Logout
@users.delete("/user/logout")
@login_required
def user_logout():
    logout_user()
    return {}, 204

#Create User/Register User
@users.post("/user/register")
def user_register():
    if current_user.is_authenticated:
        return jsonify({
            "message": "User already loged in"
        })
    json = request.json
    newuser = User.create_user(json)
    return jsonify(newuser.to_dict()), 201

#Delete User
@login_required
@users.delete("/user/delete")
def user_delete():
    current_user.delete_user()
    return {}, 204

#Edit User
@login_required
@users.patch("/user/patch")
def patch_user():
    # json = request.json

    # try:
    #     patched_user = current_user.patch_user(json)
    #     return jsonify(patched_user.to_dict()), 200
    # except ValueError as e:
    #     return jsonify({"message": str(e)}), 400
    
    # except Exception as e:
    #     print("Unexpected error:", e)
    #     return jsonify({"message": "Server error" }), 500
    user = current_user

    full_name = request.form.get("full_name")
    email = request.form.get("email")
    bio = request.form.get("bio")

    avatar_file = request.files.get("avatar")

    if avatar_file:
        uploaded = cloudinary.uploader.upload(avatar_file)
        user.avatar = uploaded("secure_url")

    if full_name is not None:
        user.full_name = full_name
    
    if email is not None:
        user.email = email

    if bio is not None:
        user.bio = bio

    new_password = request.form.get("new_password")
    current_password = request.form.get("current_password")

    user.save()   # SQLAlchemy commit
    return jsonify(user.to_dict()), 200

#Get All Users; To delete!!
@users.get("/user/all")
def get_users():
    users_dicts = [user.to_dict() for user in User.get_users()]
    return jsonify(users_dicts), 200
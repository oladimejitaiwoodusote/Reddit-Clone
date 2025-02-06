from reddit_clone.users.models import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

user = Blueprint("users", __name__)

#Login
@user.post("/user/login")
def user_login():
    if current_user.is_authenticated:
        return jsonify({
            "message": "User already loged in"
        }), 200

    json = request.json
    user = User.authenticate(json['username'], json['password'])
    if user:
        login_user(user)
        return jsonify(user.to_dict())
    return jsonify({"message": "Invalid username or password"}), 409

#Logout
@user.delete("/user/logout")
@login_required
def user_logout():
    logout_user(current_user)

#Create User/Register User
@user.post("/user/register")
def user_register():
    if current_user.is_authenticated:
        return jsonify({
            "message": "User already loged in"
        })
    json = request.json
    newuser = User.create_user(json)
    return jsonify(newuser.to_dict())

#Delete User
@login_required
@user.delete("/user/delete")
def user_delete():
    current_user.delete_user()
    return jsonify({
        "message": "User deleted"
    })
    

    

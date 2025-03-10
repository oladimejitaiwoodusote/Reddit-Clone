from reddit_clone.posts.models import Post
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

posts = Blueprint("posts", __name__)

#Create Post
@posts.post("/post/create")
@login_required
def create_post():
    json = request.json
    post = Post.create_post(json, current_user.id)
    if post:
        return jsonify(post.to_dict()), 201
    return jsonify({"message": "Post not created succesfully"}), 400

#Delete Post
@posts.delete("/post/delete/<int:id>")
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"message": "Post not found"}),404

    if post.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only delete your own posts!"}), 403

    post.delete_post()
    return jsonify({ "message": "Post deleted"})

#Patch Post
@posts.patch("/post/edit/<int:id>")
@login_required
def patch_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"message": "Post not found"}),404

    if post.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only edit your own posts!"}), 403

    json = request.json
    post.patch_post(json)
    return jsonify(post.to_dict()), 200
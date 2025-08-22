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

#Get posts sorted by newest
@posts.get("/post/new")
def get_posts_new():
    post_dicts = [post.to_dict() for post in Post.get_posts_by_new()]
    return jsonify(post_dicts), 200

#Get posts sorted by popularity
@posts.get("/post/popular")
def get_posts_popularity():
    post_dicts = [post.to_dict() for post in Post.get_posts_by_popularity()]
    return jsonify(post_dicts), 200

#Get Indivual Posts
@posts.get("/post/<int:post_id>")
def get_post(post_id):
    post_dict = Post.get_post(post_id).to_dict()
    return jsonify(post_dict), 200

#Get Comments for Individual Post
@posts.get("/post/comments/<int:post_id>")
def get_post_comments(post_id):
    comment_dicts = [comment.to_dict() for comment in Post.get_post_comments(post_id)]
    return jsonify(comment_dicts), 200
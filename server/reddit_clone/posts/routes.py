from reddit_clone.posts.models import Post
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
import cloudinary
from cloudinary import uploader

posts = Blueprint("posts", __name__)

#Create Post
@posts.post("/post/create")
@login_required
def create_post():
    # json = request.json
    # post = Post.create_post(json, current_user.id)
    # if post:
    #     return jsonify(post.to_dict()), 201
    # return jsonify({"message": "Post not created succesfully"}), 400
    title = request.form.get("title")
    content = request.form.get("content")
    subreddit_id = request.form.get("subreddit_id")
    media_file = request.files.get("media")

    media_url = None
    if media_file: 
        uploaded = cloudinary.uploader.upload(media_file)
        media_url = uploaded.get("secure_url")

    post = Post.create_post({
        "title": title,
        "content": content,
        "media": media_url,
        "subreddit_id": subreddit_id
    }, current_user.id)

    return jsonify(post.to_dict()), 201
    


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
    return jsonify(post.to_dict(current_user)), 200

#Get posts sorted by newest
@posts.get("/post/new")
def get_posts_new():
    post_dicts = [post.to_dict(current_user) for post in Post.get_posts_by_new()]
    return jsonify(post_dicts), 200

#Get posts sorted by popularity
@posts.get("/post/popular")
def get_posts_popularity():
    post_dicts = [post.to_dict(current_user) for post in Post.get_posts_by_popularity()]
    return jsonify(post_dicts), 200

#Get Indivual Posts
@posts.get("/post/<int:post_id>")
def get_post(post_id):
    # post_dict = Post.get_post(post_id).to_dict()
    # return jsonify(post_dict), 200
    post = Post.get_post(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 404
    
    post_dict = post.to_dict(current_user)
    return jsonify(post_dict), 200

#Get Comments for Individual Post
@posts.get("/post/comments/<int:post_id>")
def get_post_comments(post_id):
    comment_dicts = [comment.to_dict(current_user) for comment in Post.get_post_comments(post_id)]
    return jsonify(comment_dicts), 200
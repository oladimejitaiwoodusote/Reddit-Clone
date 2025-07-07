from reddit_clone.subreddits.models import Subreddit
from flask import Blueprint, request, jsonify
from flask_login import login_required

subreddits = Blueprint("subreddits", __name__)

#Create Subreddit
@subreddits.post("/subreddit/create")
@login_required
def create_subreddit():
    json = request.json
    subreddit = Subreddit.create_subreddit(json)
    if subreddit:
        return jsonify(subreddit.to_dict()), 201

    return jsonify({"message": "Subreddit not created succesfully"}), 400

#Patch Subreddit
@login_required
@subreddits.patch("/subreddit/edit/<int:id>")
def patch_subreddit(id):
    subreddit = Subreddit.query.get(id)
    if not subreddit:
        return jsonify({"message": "Subreddit not found"}), 404

    json = request.json
    subreddit.patch_subreddit(json)
    return jsonify(subreddit.to_dict()), 200

#Get Subreddits
@subreddits.get("/subreddits/all")
def fetch_subreddits():
    fetched_subreddits = Subreddit.get_subreddits()
    subreddits = [subreddit.to_dict() for subreddit in fetched_subreddits]
    return jsonify(subreddits), 200

#Get Individual Subreddit
@subreddits.get("/subreddit/r/<string:subreddit_name>")
def get_subreddit(subreddit_name):
    subreddit = Subreddit.get_subreddit(subreddit_name)
    if not subreddit:
        return jsonify({"message": "Subreddit not found"}), 401

    return jsonify(subreddit.to_dict()), 200

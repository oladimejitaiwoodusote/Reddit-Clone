from dotenv import dotenv_values
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URI = os.environ.get("DATABASE_URI")
SECRET_KEY = os.environ.get("SECRET_KEY")

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False  # change to True in production w/ HTTPS
SESSION_COOKIE_SAMESITE = "Lax"

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")
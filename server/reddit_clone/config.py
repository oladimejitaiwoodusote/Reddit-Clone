from dotenv import dotenv_values

DATABASE_URI = dotenv_values()["DATABASE_URI"]
SECRET_KEY = dotenv_values()["SECRET_KEY"]

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False  # change to True in production w/ HTTPS
SESSION_COOKIE_SAMESITE = "Lax"
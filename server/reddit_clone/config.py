from dotenv import dotenv_values

DATABASE_URI = dotenv_values()["DATABASE_URI"]
SECRET_KEY = dotenv_values()["SECRET_KEY"]

# Reddit Clone

A fullstack Reddit-inspired application built with React + Typescript with Flask

Deployed site: https://reddit-clone-zeta.vercel.app/

![Home](images/Home_Page.png)

Backend API: https://reddit-clone-backend-ozow.onrender.com/

## Demo Login Credentials

To test the application without creating an account, you can log in using:

- **Username:** eric17
- **Password:** newpassword

## Technologies Used

### Front End Technologies

- React (Typescript)
- React Router DOM
- React Icons
- Vite (React + SWC)

### Backend End Technologies

- Flask
- Flask-SQL Alchemy
- Flask-Migrate
- Flask-Login
- Flask-Bcrypt

### Database

- PostgreSQL
- Neon PostgreSQL Instance

### Cloud and Storage

- Cloundinary (image upload)

### Deployment

- Render: Hosting for Flask Backend
- Vercel: Hosting for React Frontend

## Features

### User Account and Profile Management

- Account Creation: Users can sign up to create personal accounts

![SignUp](images/Account_Creation.png)

- User Authentication: Users can sign in accounts and logout
![LogIn](images/Aunthentication.png)

- Profile Customization: Users can edit their profiles to change their fullname, email, avatar, bio and password
![ProfilePage](images/Profile_Page_1.png)
![ProfilePage2](images/Profile_Page_2.png)
  
### Social Interaction

- Subscription Sustem: Users can subscribe to any subreddit thread
- Post Interactions: Users can vote on posts and comments. Users can create comments on posts
![Posts](images/Post_Interactivity_1.png)
![Posts2](images/Post_Interactivity_2.png)

- Home Page: Users can explore posts from subreddits they are subscribed too. Unauthenticated users view all posts
- Popular Page: Users can explore popular posts from subreddits they are subscribed too. Unauthenticated users view all popular posts
- Subreddit Page: Users can subscribe and unsubscribe to a subreddit on its subreddit page
![Subreddit](images/Subreddit_Page.png)


### Content Creation and Management

- Post Creation: Users can create new posts for a subreddit
![CreatePost](images/Post_Creation.png)

- Comment Editing: Users can edit comments on posts

## Installation and Setup

This project consists of two main parts: the backend (Flask app) and the frontend (React + Typescript). Follow the steps below to set up and run both parts of the application.

### Backend (Flask App)

- Clone the repo `git clone git@github.com:oladimejitaiwoodusote/Reddit-Clone.git`
- Navigate to the server directory `cd server`
- Create a virtual python environment `python -m venv myenv`
- Activate virtual environment `source myenv/bin/activate`
- Install required project dependencies `pip install -r requirements.txt`
- Set up the flask database `flask db init` `flask db migrate -m 'Initial migration'` `flask db upgrade`
- Run the flask app `flask run`

### Frontend (React App)
- Open new terminal and navigate to the client directory `cd ..` `cd client`
- Install the necesarry npm packages `npm install`
- Start the React development server `npm run`









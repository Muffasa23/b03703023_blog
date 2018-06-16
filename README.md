 ## Demo
 
 ![img](https://github.com/Muffasa23/b03703023_blog/blob/master/demo/blog.png)
 Sign up:
 ![img](https://github.com/Muffasa23/b03703023_blog/blob/master/demo/sign_up.gif)
 Sign in:
 ![img](https://github.com/Muffasa23/b03703023_blog/blob/master/demo/sign_in.gif)
 Read posts:
 ![img](https://github.com/Muffasa23/b03703023_blog/blob/master/demo/read_posts.gif)
 Add post:
 ![img](https://github.com/Muffasa23/b03703023_blog/blob/master/demo/add_post.gif)
 
 ## Description
The app is built with `react`, `Express` and `mysql`.

The components are all pure css, no `material-ui` or `antd` are used.

You are able to...
- Read the blog without logging in.
- Write blog posts after signing in.


## Possible Errors
- The error `GET /__webpack_hmr 404` keeps showing up in the console every couple of seconds (Changing the server port can solve it temporarily)
- The server crashes out at times with the `ER_CON_COUNT_ERROR: Too many connections` error


## Todos 
- I haven't add any alerts yet (at situations such like entering the wrong password...).
- Lack of authentication when having identical users or posts.
- Does not handle `react-router` very well.
- Not able to edit articles.


## Usage
```
github clone https://github.com/Muffasa23/b03703023_blog.git

cd b0370323_blog/blogApp
npm install
npm start

cd b03703023_blog/blogServer
npm install 
npm start
```

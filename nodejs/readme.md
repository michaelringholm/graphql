

# Good links
https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

# Query
query getSingleCourse($courseId: Int!) {
  course(id: $courseId) {
    author
  }
}

# All books
{
  allBooks {
    id, title,description,author
  }
}

# Book by id
{
  bookById(id:"1")
  {id,title}  
}

# Books by title
{
  booksByTitle(title:"nOd") {
    id, title
  }
}

# NodeJS link
https://rishabh.io/recipes/how-to-export-a-class-from-module-nodejs6.html
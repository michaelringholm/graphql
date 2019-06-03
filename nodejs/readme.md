

# Good links
https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

# Query
query getSingleCourse($courseId: Int!) {
  course(id: $courseId) {
    author
  }
}

# Variables
{
  "courseId": 1
}

# Sample query by id
{
  course(id:"1")
  {id,title}  
}

# Sample query
{
  courses {
    id, title,description,author
  }
}

# fasdf
{
  course(title:"The Complete Node.js Developer Course") {
    id
  }
}
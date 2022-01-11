

# Polling API(https://polling-api-cn.herokuapp.com/api/v1/questions)
- You need to create an API where anyone can create questions with options and also add votes to it Authentication/User identity is not needed, this is going to be a completely open application, however if you want to and think there's extra time, you can create authentication

## Basic Features
- Create a question (you can add as many questions as you want)

- Add options to a question

- Add a vote to an option of question

- Delete a question (optional: A question can't be deleted if one of it's options has votes) Delete an option (optional: An option can't be deleted if it has even one vote given to it)

- View a question with it's options and all the votes given to it

## How to install and run?

1. Clone this project
2. Start by installing npm and mongoDB if you don't have them already.
3. Run the Mongo Server or you can use mongodb atlas.
4. Navigate to Project Directory by :

```
cd polling-api
```

5. run following commands :

```
npm install
npm start or node index.js
```

## How to use API (Understanding the end points)? (!!Important in understanding API)

#### Base URL : `http://localhost:8000/api/v1/`

#### End Points :

1. `/questions/` (GET) : Returns all quesitons with options.<br>

Example output : <br>

```json
{
  "success": true,
  "message": "All questions",
  "data": {
    "questions": [
      {
        "options": [
          {
            "votes": 5,
            "_id": "61ddc9b16d57bd3ca03bf631",
            "text": "new option 3",
            "createdAt": "2022-01-11T18:17:21.223Z",
            "updatedAt": "2022-01-11T18:55:25.474Z",
            "__v": 0,
            "linkToVote": "http://localhost:8000/api/v1/options/61ddc9b16d57bd3ca03bf631/add_vote"
          }
        ],
        "_id": "61ddc4973ff7744b3899e6de",
        "title": "new question",
        "createdAt": "2022-01-11T17:55:35.822Z",
        "updatedAt": "2022-01-11T18:30:20.617Z",
        "__v": 5
      },
      {
        "options": [],
        "_id": "61ddd1373ce0bd0c405217a4",
        "title": "new question 1",
        "createdAt": "2022-01-11T18:49:27.872Z",
        "updatedAt": "2022-01-11T18:54:18.654Z",
        "__v": 1
      }
    ]
  }
}
```

2. `/questions/:id` (Get) : Get single question. <br>
   Example output : <br>

```json
{
  "success": true,
  "message": "Question",
  "data": {
    "question": {
      "options": [],
      "_id": "61ddd2033ce0bd0c405217ab",
      "title": "new question 2",
      "createdAt": "2022-01-11T18:52:51.006Z",
      "updatedAt": "2022-01-11T18:52:51.006Z",
      "__v": 0
    }
  }
}
```

3. `/questions/create` (POST) : Create question by passing title in body as json. <br>
   Example input : <br>

   ```json
   {
     "title": "new question"
   }
   ```

   Example output : <br>

   ```json
   {
     "success": true,
     "message": "New question created",
     "data": {
       "question": {
         "options": [],
         "_id": "61ddd2033ce0bd0c405217ab",
         "title": "new question 2",
         "createdAt": "2022-01-11T18:52:51.006Z",
         "updatedAt": "2022-01-11T18:52:51.006Z",
         "__v": 0
       }
     }
   }
   ```

4. `/questions/:id/delete` (DELETE) : Delete a question.

   Example input : pass id as params.<br>

   Example output : <br>

   ```json
   {
     "success": true,
     "message": "Question deleted",
     "data": {
       "question": {
         "options": [],
         "_id": "61ddd5735803d02100d3355e",
         "title": "new question 2",
         "createdAt": "2022-01-11T19:07:31.680Z",
         "updatedAt": "2022-01-11T19:07:31.680Z",
         "__v": 0
       }
     }
   }
   ```

5. `questions/:id/options/create` (POST) : Add option to a question.

   <br>Example input : pass id of question as params and option text in body<br>

   ```json
   {
     "text": "new option"
   }
   ```

   Example output : <br>

   ```json
   {
     "success": true,
     "message": "Option created",
     "data": {
       "question": {
         "options": [
           {
             "votes": 0,
             "_id": "61ddd60d5803d02100d33564",
             "text": "new option 2",
             "createdAt": "2022-01-11T19:10:05.100Z",
             "updatedAt": "2022-01-11T19:10:05.394Z",
             "__v": 0,
             "linkToVote": "http://localhost:8000/api/v1/options/61ddd60d5803d02100d33564/add_vote"
           }
         ],
         "_id": "61ddd1373ce0bd0c405217a4",
         "title": "new question 1",
         "createdAt": "2022-01-11T18:49:27.872Z",
         "updatedAt": "2022-01-11T19:10:05.704Z",
         "__v": 2
       }
     }
   }
   ```

6. `options/:id/delete` (DELETE) : Delete option by passing option id in params.

Example output : <br>

```json
{
  "success": true,
  "message": "Option deleted",
  "data": {
    "option": {
      "votes": 0,
      "_id": "61ddd60d5803d02100d33564",
      "text": "new option 2",
      "createdAt": "2022-01-11T19:10:05.100Z",
      "updatedAt": "2022-01-11T19:10:05.394Z",
      "__v": 0,
      "linkToVote": "http://localhost:8000/api/v1/options/61ddd60d5803d02100d33564/add_vote"
    }
  }
}
```

7.`/options/:id/add_vote` (GET) : Add votes to an option by passing option id in params.

Example output : <br>

```json
{
  "success": true,
  "message": "Voted",
  "data": {
    "option": {
      "votes": 5,
      "_id": "61ddc9b16d57bd3ca03bf631",
      "text": "new option 3",
      "createdAt": "2022-01-11T18:17:21.223Z",
      "updatedAt": "2022-01-11T18:55:25.474Z",
      "__v": 0,
      "linkToVote": "http://localhost:8000/api/v1/options/61ddc9b16d57bd3ca03bf631/add_vote"
    }
  }
}
```

## Directory Structure and flow of The Code

This code follows MVC pattern and hence everything is differentiated and well managed:

`/routes` - containes all the routes. <br>
`/controllers/` - containes api files <br>
`/model` - to store data in db we need models. <br>
`/config` - contains config files for mongoose <br>

Feel free to use and contribute! :)

# Homework-11

For this homework assignment, it was necessary to create a server.js file for the routing, posting and deleting.

First, express, path and fs were required and our port and server was set up.  It took me a while to figure out that I needed express to be able to access the public folder using express.static.

After that, I created a notes variable that calls in information from the db.json file provided.

Then I set up the get requests for the different routes. 

When a note is posted to the array, it adds an id key that is set equal to the title of the note.

When a note is deleted, a new array is created.  If the id does not match the title, it is pushed to the array.  If it does, then it is not pushed to the array.

I had the most difficulty with the delete request and knowing to put the app.use(express.static('public')) line of code.
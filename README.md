# MultiFactor Authentication
  ***In the backend folder, under config edit the .env file with your twilio account details for this application to work.***
  
 **Twilio a cloud communication platform used to send or receive text message which can help developers to implement the multi-factor authentication functionality.**
 
  **Set up a twilio account and get the configuration details and Add it in the .env file**
  
  To start the front-end and backend run this command seperately for both the folders,
    Npm start

## Front-end 
  Used Angular, Bootstrap.
  
  Contains A navbar and 3 pages Login, Register, and Verify page.
  
  User has to register using email and phone number, upon sucessfull registeration a verification code is sent to the registered number.
  
  Now in the verify page the code can be entered and upon successfull verification the user is logged in and lands to the dashboard page.

## Back-end
  Used Node.js and express.
  MongoDB for database.

1. Firstly Connect The MongoDB --->  Create db.js 
2. Create a User.js in models ---->  Create a schema for user
3. Create a Notes.js in models ----> Create a schema for Notes
4. Create a auth.js in routes ---->  This code defines an API endpoint for creating a new user

 ------- Creating new User End Point ------------
• use the validation on auth Endpoint
• use validationResult for if there is an error user cannot be created
 ------- Try Catch ------ 
• generating salt for hashing
• create securePassword using hashing function
• Checking if user already exist in database Throw error
• Creating New User from the Help of User.js (Schema)
• Creating Authentication Token (Notice)-------> Sending User ID in Token Because Id is Fastest Accessible
• Sending Token in Response

 --------- Creating Login or SignIN  End Point ------------
 • use the validation on auth Endpoint
 • use validationResult for if there is an error user cannot be Login
 • -----------Try Catch ------
 • Checking if user Account exist or not in database
 • Checking if password is correct or not in database
 • Creating Authentication Token (Notice)-------> Sending User ID in Token Because Id is Fastest Access
 • Sending Token in Response

 --------Getting Loginned User Detail---------
• Creating a middleware to decode user from a JWT
• Getting User Detail from Database using ID and Selecting all fields except password
• Sending Token in Response

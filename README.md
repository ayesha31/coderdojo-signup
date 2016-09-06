# Coder Dojo Signup
Edit the client/components/text-constants.js file to change what is displayed on each of the pages. 

## Environment Variables
* PORT - the port that the application will be served on
* URL - the base url that the application is served on
* DB_URL - the MongoDB url that the application connects to
* PASSCODE_REQUIRED - if a passcode is required for the user to register for Coder Dojo
* MAX_BW_NINJAS - the number of Bankwest ninjas that can sign up, if no passcode is required this is the maximum number of spots available
* MAX_NON_BW_NINJAS - the number of external ninjas that can sign up
* BW_PASSCODE - if a passcode is required, this is the Bankwest registration passcode (case sensitive)
* EXTERNAL_PASSCODE - if a passcode is required, this is the external registration passcode (case sensitive)
* GIRLS_DOJO - if is the girls dojo, defaults to false
* EVENT_DATE - the dates or date of the event for example 18th October - 15th November, defaults to TBA
* EVENT_NAME - the name of the event ex. Bankwest CoderDojo 2016 Term 3, defaults to Bankwest CoderDojo
* EVENT_DATE_SHORT - used only for girls dojo info, is date in short form ex 3/10/16
# serpapi-google-search-rankings-nodejs
Track Google search rankings for a domain using Node.js and SerpApi, then output the data to .csv file.

## Getting Started

You need to have the latest versions of Node and Npm installed on your system. If you don’t already have Node and Npm installed you can visit the following link for help with this process: 

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 

You will also need to sign up for a free Serpapi account at https://serpapi.com/users/sign_up.



Clone this repository, then create your package.json file: 
`npm init`



  
Install the dependencies:

`npm install serpapi dotenv delay objects-to-csv`


If you haven’t already signed up for a free Serpapi account go ahead and do that now by visiting https://serpapi.com/users/sign_up and completing the signup process.

Once you have signed up, verified your email, and selected a plan, navigate to https://serpapi.com/manage-api-key . Click the Clipboard icon to copy your API key. 

Then create a new file in your project directory called ‘.env’ and add the following line: 

`SERPAPI_KEY = “PASTE_YOUR_API_KEY_HERE”"YOUR_KEY_HERE"`

You should now be able to run the script by typing `npm start` in your terminal.

The rankings should be printed out in your terminal, and `test.csv` should appear in your project directory.

## External Links

If you need help coming up with keywords to check rankings for, try this Python tool which pulls data from Google Autocomplete, People Also Ask and Related Searches and uses it to suggest SEO Keywords:

https://github.com/chukhraiartur/seo-keyword-research-tool

There is also a similar tool available via JavaScript:

https://github.com/chukhraiartur/seo-keyword-research-tool


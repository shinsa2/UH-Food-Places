# UH Food Places
## Deployed Website
## http://uhfoodplaces.meteorapp.com/

## Must have node.js, chocolatey, meteor installed.

###### There is an issue where cloning from github won't let you use the settings.development.json file properly unless you already have admin and john accounts set up in meteor; settings.development.json won't load with meteor properly otherwise (issue with setting up default accounts, aka admin and john accounts). Alteration for it to work is possible but I will omit those instructions.

###### Using your favorite IDE terminal or machine terminal, go to the app directory then start the program:
```
$ cd /app
$ npm run start
```

###### If you can't start, use:
```
$ meteor npm install
```
###### before trying to
```
$ npm run start
```

###### Access web app on a browser at:
```
localhost:3000
```

###### Use one of the pre-made accounts to sign in the web app or create your own:
```
admin login: admin@foo.com
admin password: changeme

or 

user login: john@foo.com
user password: changeme

or

click sign up to create an account
```

# Three Category Budget System


### Screens

### UI Components
 - Navigation Bar
 - Category Tabs
 - Forms for:
    - Registration
    - Login
    - Budget
    - Expense
    - Income
 - Tables for:
    - Budget
    - Expense
    - Income
    - Months End
 - Buttons 
 - Drowpdowns:
    - Toggle bewteen monthly expense reports
    - Toggle bewteen monthly month's end reports

### DB Schema
#### User:
```
firstName : string
lastName : string 
email : string : unique
password : string
```


#### Budget:
```
category 1:  
{
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
category 2:  
{
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
category 3:  
 {
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
total: number
userId: ObjectId (User)
```
#### Expense:
```
category 1: 
{
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
category 2: 
{
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
category 3:  
 {
    items: [
        {
            name: string
            amount: number
        }
        ...
    ],
    total: number
}
total: number
month: ObjectId (Month)
userId: ObjectId (User)
```

# Income
```
items: 
[
    {
        name: string
        amount: number
    }
    ...
]
total: number
month: ObjectId (Month)
userId: ObjectId (User)
```

### Month
```
month: string
year: string
```

### MonthsEnd
```
totalExpense: ObjectId (Expense)
totalIncome: ObjectId (Income)
```



### Routes
#### Index
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /         | Redirect to Login or /account |
| GET  | /login     | Show the login form
| POST  | /login     | Handle the login request 

#### Account
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /account   | Show the account information for the logged in user
| GET  | /account/new     | Show the registration form
| POST  | /account/new     | Handle the registration request
| GET  | /account/edit | Show the account update form for the logged in user
| PUT  | /account/edit | Handle the account information update request for the logged in user

#### Budget
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /budget     | Show the current budget
| GET  | /budget/new | Show the form for creating a new budget
| POST | /budget/new | Handle the request to create a new budget
| GET | /budget/edit | Show the form for editing a budget
| PUT | /budget/edit | Handle the request to edit a budget

#### Expense
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /expense | Show all the expense reports
| GET  | /expense/:id  | Show the expense selected
| GET  | /expense/new | Show the form for creating a new expense
| POST | /expense/new | Handle the request to create a new expense
| GET | /expense/edit/:id | Show the form for editing an expense
| PUT | /expense/edit/:id | Handle the request to edit an expense

#### Income
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /income     | Show the current income forecase
| GET  | /income/:id  | Show the income report selected
| GET  | /income/new | Show the form for creating a new income
| POST | /income/new | Handle the request to create a new income
| GET | /income/edit/:id | Show the form for editing an income
| PUT | /income/edit/:id | Handle the request to edit an income


#### MonthsEnd
| Method | Route | Descrioption |
| ------ | ------ | ------ |
| GET  | /monthdend | Show all the months end reports
| GET  | /monthdend/:id | Show the months end report selected
| GET  | /monthdend/new | Show the form/button to generate a new month's ned
| POST  | /monthdend/new | Handle the request to generate the report
| PUT  | /monthdend/:id | Handle the request to re-generate the report

### Reusable Functions/Classes

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)


You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop markdown and HTML files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
| --------- |-- ------ | ----- | ------- |
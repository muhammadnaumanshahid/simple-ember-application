# How to Make a Web Application Using Spring Boot
The purpose of this tutorial is to demonstrate the interaction of client-side and server-side in a web application development. We use *Ember.js* for client-side UI and *Firebase* for the server-side development. 

The tutorial uses following packages/software.

**Package** | **Version** | **Source**
--- | --- | ---
Java | 17.0.0 | https://www.oracle.com/java/technologies/downloads
Python | 2.7.18 | https://www.python.org/downloads
Spring Boot | 2.5.5 | ---
Node.js | 14.18.0 | https://nodejs.org/en
Ember-cli | 3.28.0 | ---
npm | 6.14.15 | ---
yarn | 1.22.15 | ---

## Simple Installation and Run

## Installation

* `git clone <repository-url>` this repository
* `cd simple_ember_application/<Select Task-I or Task-II>/project`
* `yarn install`

## Running / Development

* `yarn start`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Developer Information 

## Task-I
* Download or clone the Task-I/project.
* Open *Command Prompt/Terminal/Console* and navigate to the *project* directory.
* Use command *npm install* or *yarn install* to install dependencies. Then, use command *npm start* or *yarn start* to launch the project. Enable through firewall if requested.
* Open default browser and use http://localhost:4200 to access the application.
## Task-II
* Follow steps on [**Medium**](https://nauman-shahid.medium.com/how-to-build-a-simple-ember-application-80f5b8ccb076) to create Firebase database and set parameters.
* Navigate to the project directory and use the commands *npm install firebase* and *ember install emberfire@next* in the *Command Prompt/Terminal/Console* to install packages.
* Copy-paste the configuration values from *Firebase* to your *Ember.js* application */.env-sample* file and rename it as *.env*.
* Navigate to the project directory in the *Command Prompt/Terminal/Console* and and use *npm install* or *yarn install* to install dependencies. Then, use command *npm start* or *yarn start* to launch the project. Enable through firewall if requested.
* Open default browser and use *http://localhost:4200* to access the application.
* Save an email address in the database (e.g., *bennett@nshahid.info*).
## Task-III
* Generate *New Private Key* in the *Firebase Admin SDK*. Go to *Project Overview > Project Settings > Service Accounts > FireBase Admin SDK*. Download New *Private Key* (*json* file) by clicking the button *Generate new private key*. For information on how to create a Firebase account, please follow [**Medium**](https://nauman-shahid.medium.com/how-to-build-a-simple-ember-application-80f5b8ccb076) article. To know, how to create Task-III, please follow [**How to Make an Application Using Spring Boot (Server-side)**](https://medium.com/analytics-vidhya/how-to-make-a-web-application-using-spring-boot-4c89c8e7053e).
* Move the json file created in Task-II to *demo/src/main/resources* directory.
* Modify *demo/src/main/java/com/example/demo/GreetingController.java as highlighted in [**Medium**](https://nauman-shahid.medium.com/how-to-build-a-simple-ember-application-80f5b8ccb076).
* Open *Command Prompt/Terminal/Console*, navigate to the *Task-III/demo* directory and run using the command `mvn spring-boot:run`.
* Open your default browser and use the following web-links to *get_mails* from and *set_mail* to the database.
  
  *http://localhost:8080/get_mails*
  
  *http://localhost:8080/set_mail?mail=demo@demo.com*
  
#### The tutorial is available at [**Medium**](https://nauman-shahid.medium.com/how-to-build-a-simple-ember-application-80f5b8ccb076).


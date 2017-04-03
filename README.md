# AGL Coding Test

This project is a web application written using Typescript. It Consumes the [API](http://agl-developer-test.azurewebsites.net/people.json) and output a list of all the cats in alphabetical order under a heading of the gender of their owner.

Getting Started
-------------

### Clone the repository

```
git clone https://github.com/sujeesh-Lal/AGL-Coding-test.git
cd AGL-Coding-test
```

### Install dependencies

There are some tool dependencies in this project: The tools help manage and test the application.

You can get the tools the project depends upon via [npm](https://www.npmjs.org/):

``` 
 npm install
```

You should find that you have some new folders in your project:

* `node_modules` - contains the npm packages for the tools

Build and Run the Application
-------------

The project is preconfigured with a simple development web server. The simplest way to start this server is:

```
npm run build
npm start
```

This will open the url http://localhost:8000 in browser 

NOTE:  Please make sure the url is open in the browser web security disable (Cross domain request).

----------

To delete the `dist` dir, you may run:

```
npm run clean
```

Directory Layout
-------------

```
|   .gitignore
|   .index.html
|   package.json
|   tsconfig.json
|   tslint.json
|   webpack.config.js
|   
+---src                             // root folder for all app related scripts
|   |   app.css
|   |   app.ts
|   |   index.ts
|   |   typings.d.ts
|   |   
|           
+---config                         
|   |   config.json               // File which have global app configurations
|   |   data.json                 // Sample data
|        
+---test                            // root folder for all test related scripts
    |   index.spec.ts
    |   
```

Testing
-------------

The project is configured with unit tests written in **Mocha** using **Chai** assertions and **ChaiSpies** spies.

The easiest way to run the unit tests is:

```
npm run test
```

Output
-------------

![Alt text](https://github.com/sujeesh-Lal/AGL-Coding-test/blob/master/assets/output.jpg)


## Author

**Sujeesh Lal** 

Follow me:
  [GitHub](https://github.com/sujeesh-Lal)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

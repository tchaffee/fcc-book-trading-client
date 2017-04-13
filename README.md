This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It uses [auth0](https://auth0.com/) for login and identity.

To start the app
```
vagrant up
vagrant ssh -c "cd /vagrant && npm start"
```

On your local box you should be able to view the app at [http://localhost:3000](http://localhost:3000)

## Features
- Client and server are separate apps with separate repos.
- Uses react router, including authentication routes.
- Some automated browser testing using Cucumber, Chai with Promises, and Selenium. Done for proof of concept but tests are not complete.

## Testing
From the vagrant box:

`npm run test [-- cucumber-args]`

For example:

`npm run test -- --tags @login`

You can watch the tests using a VNC server on the vagrant box:

`x11vnc -display :99`

And then running a VNC viewer on your local box, for example Vinagre for Ubuntu. The VNC port is 5900.

## To-Do
1. Extract a \<BooksList> component from \<Books>
1. Get Visual Code debugging to work.
1. Improve the buttons' CSS. Some should be grayed out and not clickable at times.
1. Improve the overall look?
1. Deploy to c9.io
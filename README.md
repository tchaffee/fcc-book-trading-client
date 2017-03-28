This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To start the app
```
vagrant up
vagrant ssh -c "cd /vagrant && npm start"
```

On your local box you should be able to view the app at http://localhost:3000

## Testing
From the vagrant box:

`npm run test [-- cucumber-args]`

For example:

`npm run test -- --tags @login`

You can watch the tests using a VNC server on the vagrant box:

`x11vnc -display :99`

And then running a VNC viewer on your local box, for example Vinagre for Ubuntu. The VNC port is 5900.

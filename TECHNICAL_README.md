#Let's Get Drunk - Technical Readme

##Installation
Assuming you have Oracle VM Virtualbox Manager, Vagrant and Git Bash installed:
`vagrant up`
in the `vagrant/drinking` folder.

ssh in and make a folder for the project
`vagrant ssh`

`cd /var`

`sudo mkdir letsGetDrunk`

`sudo chown vagrant:vagrant /var/letsGetDrunk`


Configure your PHPStorm or whatever editor to upload the files onto the server:
SFTP: 127.0.0.1:2222

U: vagrant

P: vagrant


Upload your files to /var/letsGetDrunk

Back to the vagrant ssh
Let's install modules, so in `/var/letsGetDrunk`

`npm install`

And some more:

`bower install`

 
OK we're done, let's run the magic grunt server:

`grunt serve`

In your browser go to localhost:9000

BOOM! you'll also notice if you make a change on the code (assuming you have auto-upload on in PHPStorm) then the localhost:9000 will update without you even having to reload the page. Magic.

##Optional Guide
###Adding Routes, Views and Controllers
You should add these with yo, but that's on your vagrant. So once you've done it you have to copy the files off vagrant and then you can add them to the project.
See [yo angular generator](https://github.com/yeoman/generator-angular) for general how-to.
if you make a route, controller and view for "cats" like:
`yo angular:route cats`
Then download the `/var/letsGetDrunk/app` folder back to your local machine so you can add all the new/changed files to git and push it.

##Current TODOs

- Sound
- Add actual quests
- Style

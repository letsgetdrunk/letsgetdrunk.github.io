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
`grunt server`

In your browser go to localhost:9000

BOOM!

##Current TODOs

- More elegant way of setting up whos currently playing rather than just my mates.

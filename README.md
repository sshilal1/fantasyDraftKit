# Fantasy Football Draft Kit
[See Live](https://www.github.com/sshilal1/fantasyDraftKit)

## In order to host this application there is some building that needs to take place:
* First, the server downloads all the player images
	* Optimize the images by resizing and converting to jpeg using [sharp](http://sharp.dimens.io/en/stable/)
* The server scrapes the web for player statistics and player rankings, stores them in a SQL database.
	* As a backup, I have the statistics saved locally as json files
In order to maintain synchronousness with this build process, I use nodes' child_process.execSync function.

To get started (without stats and rankings):

```
git clone https://github.com/sshilal1/fantasyDraftKit.git
cd fantasyDraftKit
npm install
npm run build (node build.js) // Should take a few minutes
npm run dev
```
Then visit your localhost:8080!

To use the full application (with player stats and rankings), you will need access to my SQL server hosting the player rankings; updated daily.
You will also need a server to host the application and serve the player stats (as I dont ship them with the application)
To request access to rankings, email me at stephen.shilale@gmail.com
To setup the server, run the following:

```
webpack //to compress and ship the application into a bundled client.min.js
node server.js
```
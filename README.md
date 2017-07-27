# Fantasy Football Draft Kit
[See Live](https://www.github.com/sshilal1/fantasyDraftKit)

## In order to host this application there is some building that needs to take place:
* First, the server downloads all the player images
	* Optimize the images by resizing and converting to jpeg using [sharp](http://sharp.dimens.io/en/stable/)
* Then the server scrapes the web for player statistics and player rankings, stores them in a SQL database.
	* As a backup, I have the statistics saved locally as json files
	* Id like to ship this data with the application, so there is minimal internet need after the initial load
In order to maintain synchronousness with this build process, I use nodes' child_process.execSync function.

```
git clone https://github.com/sshilal1/fantasyDraftKit.git
cd fantasyDraftKit
npm install
npm run build (node build.js) // Should take a minutes
npm run dev
```
Then visit your localhost:8080!

Or if you prefer a non development build, just run ```webpack``` and open the index.html file in the /src directory
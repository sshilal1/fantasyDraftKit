for (i=0;i <12; i++) {
	var team = 'team' + draftInfo.teams[i].teamId;
	var teamBox = document.getElementById(team);
	
	var teamName = document.createElement('h1');
	teamName.innerHTML = draftInfo.teams[i].teamAbbrev;
	teamName.style.float = "left";
	teamName.style.margin = "10px";
	teamBox.appendChild(teamName);
	
	var owner = document.createElement('h3');
	owner.innerHTML = draftInfo.teams[i].owners[0].firstName + ' ' + draftInfo.teams[i].owners[0].lastName;
	owner.style.margin = "10px";
	teamBox.appendChild(owner);

	//console.log(draftInfo.teams[t]);
}

$("button").click(function(){
	var token = draftInfo.draftToken;
	var leagueID = draftInfo.leagueId;
	var secondsT = new Date() / 1000;
	var secondsTi = Math.round(secondsT);
	console.log(secondsTi);
	var url = "http://fantasydraft.espn.com/league-" + leagueID + "/extdraft/json/POLL?&poll=" + secondsTi +"&token=" + token;
	url += "&r=" + Math.floor(Math.random()*5000);
	var newData;
	//drawCanvas(30);

	
	$.ajax({url: url, success: function(result){
		newData = result.replace('draft.processMessage(','');
		newData = newData.replace(/\);draft.processMessage.*/,''); 
		
		console.log(result);
		var obj = JSON.parse(newData);
		
		console.log(obj);
	}});
	
	/*	
	$.ajax({
		type:'GET',
		url: 'http://games.espn.com/ffl/htmldraft?leagueId=564312&teamId=3&fromTeamId=3',
		dataType: 'html',
		cache: true,
		success: function(result) {
			//var test = $.getScript(url); // we don't want this to be cached - so we'll use the $.getScript() method
			console.log(result);
		}
	});

	$.ajax({
		url: "http://games.espn.com/ffl/htmldraft?leagueId=551811&teamId=9&fromTeamId=9",
		dataType: "script",
		success: function(result) {
			console.log(result);
		}		
	});
	
	/*
	$.ajax({url: url, success: function(result){
		newData = result.replace('draft.processMessage(','');
		newData = newData.replace(/\);draft.processMessage.*//*,'');
		console.log(result);
		var obj = JSON.parse(newData);
		
		console.log(obj);
	}});
	*/
	

});

var results = {
  pickHistory: [{
    selectionId: 1,
    teamId: 1,
    undo: false,
    player: {
      playerId:13934,
      firstname:"Antonio",
      lastname:"Brown",
      positionId:3,
      proTeamId:23,
    }
  },
  {
    selectionId: 2,
    teamId: 2,
    undo: false,
    player: {
      playerId:13982,
      firstname:"Julio",
      lastname:"Jones",
      positionId:3,
      proTeamId:1,
    }
  }]
}

// Parse through json objects
for (var pick in results.pickHistory) {
  // create element
  var draftList = document.getElementById("draftPlayerList"); 
  var teamBox = document.getElementById("team1");
  
  var playerPick = document.createElement('div');
  playerPick.innerHTML = results.pickHistory[pick].player.firstname + " " + results.pickHistory[pick].player.lastname;
  playerPick.setAttribute("href", "");
  playerPick.setAttribute("class", "flexpop");
  playerPick.setAttribute("content", "tabs#ppc");
  playerPick.setAttribute("instance", "_ppc");
  playerPick.setAttribute("fpopheight", "357px");
  playerPick.setAttribute("fpopwidth", "490px");
  playerPick.setAttribute("tab", "null");
  playerPick.setAttribute("leagueid", draftInfo.leagueId);
  playerPick.setAttribute("playerid", results.pickHistory[pick].player.playerId);
  playerPick.setAttribute("teamid", results.pickHistory[pick].teamId);
  playerPick.setAttribute("seasonid", "2016");
  playerPick.setAttribute("cache", "true");
  playerPick.style.padding = '2px';
  playerPick.style.margin = '2px';
  teamBox.appendChild(playerPick);

  var draftPick = document.createElement('div');
  draftPick.innerHTML = results.pickHistory[pick].selectionId + ". " + results.pickHistory[pick].player.firstname + " " + results.pickHistory[pick].player.lastname;
  draftPick.setAttribute("href", "");
  draftPick.setAttribute("class", "flexpop");
  draftPick.setAttribute("content", "tabs#ppc");
  draftPick.setAttribute("instance", "_ppc");
  draftPick.setAttribute("fpopheight", "357px");
  draftPick.setAttribute("fpopwidth", "490px");
  draftPick.setAttribute("tab", "null");
  draftPick.setAttribute("leagueid", draftInfo.leagueId);
  draftPick.setAttribute("playerid", results.pickHistory[pick].player.playerId);
  draftPick.setAttribute("teamid", draftInfo.toTeamId);
  draftPick.setAttribute("seasonid", "2016");
  draftPick.setAttribute("cache", "true");
  draftPick.style.padding = '2px';
  draftPick.style.margin = '2px';
  draftList.appendChild(draftPick);
}
/*
<a href="" class="flexpop" 
content="tabs#ppc" 
instance="_ppc" 
fpopheight="357px" 
fpopwidth="490px" 
tab="null" 
leagueid="1582906" 
playerid="2580" 
teamid="3" 
seasonid="2016" 
cache="true">Drew Brees</a>
*/
var counter=0;

function drawCanvas(theCount){
  var canvas=document.getElementById('mycanvas');
  var ctx=canvas.getContext('2d');
  var cWidth=canvas.width;
  var cHeight=canvas.height;
  
  ctx.clearRect(0,0,cWidth,cHeight);
  
  var countTo=theCount;
  
  var min=Math.floor(countTo/60);
  var sec=countTo-(min*60);
  counter = 0;
  var angle=270;
  var inc=360/countTo; 
	
	setInterval(drawScreen,1000);
  function drawScreen() {

    //======= reset canvas
    
    ctx.fillStyle="#2e3032";
    ctx.fillRect(0,0,cWidth,cHeight);
    
    //========== base arc
    
    ctx.beginPath();
    ctx.strokeStyle="#252424";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();
    
    //========== dynamic arc
    
    ctx.beginPath();
    ctx.strokeStyle="#df8209";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*270,(Math.PI/180)*angle,false);
    ctx.stroke();
    ctx.closePath();
    
    //======== inner shadow arc
    
    grad=ctx.createRadialGradient(cWidth/2,cHeight/2,80,cWidth/2,cHeight/2,115);
    grad.addColorStop(0.0,'rgba(0,0,0,.4)');
    grad.addColorStop(0.5,'rgba(0,0,0,0)');
    grad.addColorStop(1.0,'rgba(0,0,0,0.4)');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();
    
    //======== bevel arc
    
    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'#6c6f72');
    grad.addColorStop(0.5,'#252424');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,93,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();
    
    //====== emboss arc
    
    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'transparent');
    grad.addColorStop(0.98,'#6c6f72');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,107,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();
    
    //====== Labels
    
    var textColor='#646464';
    var textSize="12";
    var fontFace="helvetica, arial, sans-serif";
    
    ctx.fillStyle=textColor;
    ctx.font=textSize+"px "+fontFace;
    ctx.fillText('MIN',cWidth/2-46,cHeight/2-40);
    ctx.fillText('SEC',cWidth/2+25,cHeight/2-15);
    
    //====== Values
    
    
    
    ctx.fillStyle='#6292ae';
    
    if (min>9) {
      ctx.font='84px '+fontFace;
      ctx.fillText('9' ,cWidth/2-55,cHeight/2+35);
      
      ctx.font='24px '+fontFace;
      ctx.fillText('+' ,cWidth/2-72,cHeight/2-5);      
    }
    else {
      ctx.font='84px '+fontFace;
      ctx.fillText(min ,cWidth/2-60,cHeight/2+35);
    }
    
    ctx.font='50px '+fontFace;
    if (sec<10) {
      ctx.fillText('0'+sec,cWidth/2+10,cHeight/2+35);
    } 
    else {
      ctx.fillText(sec,cWidth/2+10,cHeight/2+35);
    }
    
    
    if (sec<=0 && counter<countTo) {
      angle+=inc;
      counter++;
      min--;
      sec=59; 
    } else
      if (counter>=countTo) {
        sec=0;
        min=0;
      } else {
        angle+=inc;
        counter++;
        sec--;
      }
  }
  
  
  
}


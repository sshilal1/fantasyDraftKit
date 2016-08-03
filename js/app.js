/* ----------Test
----------------------------------------------------
------------ Developed by: Stephen Shilale
*/

var url = "http://www.ourlads.com/nfldepthcharts/depthcharts.aspx";
var teamID;

var teams = {
	// East
	buf: {
		name: 'Bills',
		city: 'Buffalo',
		color1: '#00338D',
		color2: '#C60C30'
	},
	mia: {
		name: 'Dolphins',
		city: 'Miami',
		color1: '#008E97',
		color2: '#F58220'
	},
	ne: {
		name: 'Patriots',
		city: 'New England',
		color1: '#002244',
		color2: '#C60C30'
	},
	nyj: {
		name: 'Jets',
		city: 'New York',
		color1: '#203700',
		color2: '#ffffff'
	},
	// North
	bal: {
		name: 'Ravens',
		city: 'Baltimore',
		color1: '#241773',
		color2: '#9E7C0C'
	},
	cin: {
		name: 'Bengals',
		city: 'Cincinatti',
		color1: '#FB4F14',
		color2: '#000000'
	},
	cle: {
		name: 'Browns',
		city: 'Cleveland',
		color1: '#FB4F14',
		color2: '#22150C'
	},
	pit: {
		name: 'Steelers',
		city: 'Pittsburgh',
		color1: '#FFB612',
		color2: '#000000'
	},
	// South
	hou: {
		name: 'Texans',
		city: 'Houston',
		color1: '#03202F',
		color2: '#A71930'
	},
	ind: {
		name: 'Colts',
		city: 'Indianapolis',
		color1: '#002C5F',
		color2: '#A5ACAF'
	},
	jac: {
		name: 'Jaguars',
		city: 'Jacksonville',
		color1: '#006778',
		color2: '#D7A22A'
	},
	ten: {
		name: 'Titans',
		city: 'Tennessee',
		color1: '#002244',
		color2: '#4B92DB'
	},
	// West
	den: {
		name: 'Broncos',
		city: 'Denver',
		color1: '#002244',
		color2: '#FB4F14'
	},
	kc: {
		name: 'Chiefs',
		city: 'Kansas City',
		color1: '#E31837',
		color2: '#000000'
	},
	oak: {
		name: 'Raiders',
		city: 'Oakland',
		color1: '#A5ACAF',
		color2: '#000000'
	},
	sd: {
		name: 'Chargers',
		city: 'San Diego',
		color1: '#FFB612',
		color2: '#002244'
	},
	// NFC
	// East
	dal: {
		name: 'Cowboys',
		city: 'Dallas',
		color1: '#002244',
		color2: '#B0B7BC'
	},
	nyg: {
		name: 'Giants',
		city: 'New York',
		color1: '#0B2265',
		color2: '#A71930'
	},
	phi: {
		name: 'Eagles',
		city: 'Philidelphia',
		color1: '#004953',
		color2: '#A5ACAF'
	},
	was: {
		name: 'Redskins',
		city: 'Washington',
		color1: '#773141',
		color2: '#FFB612'
	},
	// North
	chi: {
		name: 'Bears',
		city: 'Chicago',
		color1: '#0B162A',
		color2: '#C83803'
	},
	det: {
		name: 'Lions',
		city: 'Detroit',
		color1: '#005A8B',
		color2: '#B0B7BC'
	},
	gb: {
		name: 'Packers',
		city: 'Green Bay',
		color1: '#203731',
		color2: '#FFB612'
	},
	min: {
		name: 'Vikings',
		city: 'Minnesota',
		color1: '#4F2683',
		color2: '#FFC62F'
	},
	// South
	atl: {
		name: 'Falcons',
		city: 'Atlanta',
		color1: '#A71930',
		color2: '#000000'
	},
	car: {
		name: 'Panthers',
		city: 'Carolina',
		color1: '#0085CA',
		color2: '#000000'
	},
	no: {
		name: 'Saints',
		city: 'New Orleans',
		color1: '#9F8958',
		color2: '#000000'
	},
	tb: {
		name: 'Buccaneers',
		city: 'Tampa Bay',
		color1: '#D50A0A',
		color2: '#000000'
	},
	// West
	arz: {
		name: 'Cardinals',
		city: 'Arizona',
		color1: '#97233F',
		color2: '#000000'
	},
	ram: {
		name: 'Rams',
		city: 'Los Angeles',
		color1: '#002244',
		color2: '#B3995D'
	},
	sf: {
		name: '49ers',
		city: 'San Francisco',
		color1: '#AA0000',
		color2: '#B3995D'
	},
	sea: {
		name: 'Seahawks',
		city: 'Seattle',
		color1: '#002244',
		color2: '#69BE28'
	}
};

$('.team').hover(function() {
  $(this).css('background-color', shadeColor(teams[this.id].color1,-30));
}, function() {
  $(this).css('background-color', teams[this.id].color1);
});

// <img src="https://logo.clearbit.com/baltimoreravens.com">

for (var t in teams) {
	// Grab each team
	var teamBox = document.getElementById(t);
	
	// Set colors
	teamBox.style.background = teams[t].color1;
	
	// Create elements in each box
	var depthChart = document.createElement('a');
	var offseasonMoves = document.createElement('a');
	//var teamName = document.createElement('div');
	var logo = document.createElement('img');
	
	// Data location online
	var depthLoc = "http://www.espn.com/nfl/team/depth/_/name/" + t;
	var offseasonLoc = "http://espn.go.com/nfl/team/transactions/_/name/" + t;
	var logoLoc;
	
	// 'ari' and 'la' instead of 'arz' and 'ram' for these teams
	if (t == 'arz') {logoLoc = "http://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/" + "ari" + ".png";}
	else if (t == 'ram') {logoLoc = "http://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/" + "la" + ".png";}
	else if (t == 'nyg') {logoLoc = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/New_York_Giants_logo.svg/200px-New_York_Giants_logo.svg.png";}
	else {logoLoc = "http://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/" + t + ".png";}
	
	logo.src = logoLoc;
	logo.setAttribute("width", "25%");
	logo.setAttribute("height", "25%");
	logo.style.padding = '2px';
	logo.style.margin = '10px';
	teamBox.appendChild(logo);
	
	depthChart.innerHTML = "Depth";
	depthChart.setAttribute("class", "link");
	depthChart.style.color =  teams[t].color2;
	depthChart.setAttribute("href", depthLoc);
	depthChart.setAttribute("target", "_blank");
	teamBox.appendChild(depthChart);
	
	offseasonMoves.innerHTML = "Off Season Moves";
	offseasonMoves.setAttribute("class", "link");
	offseasonMoves.style.color =  teams[t].color2;
	offseasonMoves.setAttribute("href", offseasonLoc);
	offseasonMoves.setAttribute("target", "_blank");
	teamBox.appendChild(offseasonMoves);
}

/*
$.get( url, function( data ) {
  $( ".result" ).html( data );
});
*/

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
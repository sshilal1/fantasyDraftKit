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
		color1: '#203731',
		color2: '#203700'
	},
	// East
	nyg: {
		name: 'Giants',
		city: 'New York',
		color1: '#0B2265',
		color2: '#A71930'
	},
};

$('.team').hover(function() {
  $(this).css('background-color', teams[this.id].color2);
}, function() {
  $(this).css('background-color', teams[this.id].color1);
});

for (var t in teams) {
	// Grab each team
	var teamBox = document.getElementById(t);
	
	// Set colors
	teamBox.style.background = teams[t].color1;
	
	var depthChart = document.createElement('a');
	var offseasonMoves = document.createElement('a');
	
	var depthLoc = "http://www.ourlads.com/nfldepthcharts/depthchart/" + t;
	var offseasonLoc = "http://espn.go.com/nfl/team/transactions/_/name/" + t;
	
	depthChart.innerHTML = "Depth";
	depthChart.setAttribute("class", "link");
	depthChart.setAttribute("href", depthLoc);
	depthChart.setAttribute("target", "_blank");
	teamBox.appendChild(depthChart);
	
	offseasonMoves.innerHTML = "Off Season Moves";
	offseasonMoves.setAttribute("class", "link");
	offseasonMoves.setAttribute("href", offseasonLoc);
	offseasonMoves.setAttribute("target", "_blank");
	teamBox.appendChild(offseasonMoves);
}

/*
$.get( url, function( data ) {
  $( ".result" ).html( data );
});
*/
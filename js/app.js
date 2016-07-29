/* ----------Test
----------------------------------------------------
------------ Developed by: Stephen Shilale
*/

var url = "http://www.ourlads.com/nfldepthcharts/depthcharts.aspx";
var yes;

var teams = [
	{
		id: 'nyg',
		name: 'Giants',
		city: 'New York',
		color1: '#000099',
		color2: '#0000ff',
		depth: 'http://www.ourlads.com/nfldepthcharts/depthchart/NYG',
		offseason: 'http://espn.go.com/nfl/team/transactions/_/name/nyg',
		logo: 'logos/nyg.jpeg'
	},
	{
		id: 'nyj',
		name: 'Jets',
		city: 'New York',
		color1: '#006600',
		color2: '#009900',
		depth: 'http://www.ourlads.com/nfldepthcharts/depthchart/NYG',
		offseason: 'http://espn.go.com/nfl/team/transactions/_/name/nyg',
		logo: 'logos/nyg.jpeg'
	}
]

for (team in teams) {
	$('#'+teams[team].id)
	.bind( "mouseenter", function() {
		console.log(teams[team].color2)
		$(this).css("background-color", teams[team].color2);
	});
}
/*
	.mouseout(function() {
		console.log(teams[team].color1)
		$(this).css("background-color", teams[team].color1);
	});*/
//$('#nyg').mouseover( mouseIn).mouseout( mouseOut);

function mouseIn(color) {
	$(this).css("background-color", '#000099');
}

function mouseOut(color) {
	$(this).css("background-color", '#0000ff');
}

/*
$.get( url, function( data ) {
  $( ".result" ).html( data );
});
*/
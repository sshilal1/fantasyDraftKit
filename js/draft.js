$("button").click(function(){
	var token = "1:485416:3:6033681:1291935597";
	var leagueID = "485416";
	var url = "http://fantasydraft.espn.com/league-" + leagueID + "/extdraft/json/POLL?&poll=0&token=" + token;
	url += "&r=" + Math.floor(Math.random()*5000);
	var newData;
	
	$.ajax({url: url, success: function(result){
		newData = result.replace('draft.processMessage(','');
		newData = newData.replace(/\);draft.processMessage.*/,'');
		console.log(result);
		var obj = JSON.parse(newData);
		
		console.log(obj);
	}});
});
// /draft.processMessage/g
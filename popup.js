function getEWSData()
{
	var xhr = new XMLHttpRequest();
	xhr.open( 'GET', 'https://my.engr.illinois.edu/labtrack/util_data_json.asp');
	xhr.onload = function(){fillEWSData(window.JSON.parse( xhr.responseText ).data);};
	xhr.send();
}

function fillEWSData(data)
{
	var windowsList =
	{
		"DCL L416"		: 	"DCL - L416",
		"EH 406B1"		: 	"EH - 406B1",
		"EH 406B8"		: 	"EH - 406B8",
		"MEL 1001"		: 	"MechE - 1001",
		"MEL 1009"		: 	"MechE - 1009",
		"GELIB 4th"		: 	"Grainger - 4th"
	};

	var linuxList = 
	{
		"DCL L440"		: 	"DCL - L440",
		"DCL L520"		: 	"DCL - L520",
		"EVRT 252"		: 	"Everitt - 252",
		"GELIB 057"		: 	"Grainger - 057",
		"SIEBL 0218"	: 	"Siebel - 0218",
		"SIEBL 0220"	: 	"Siebel - 0220",
		"SIEBL 0222"	: 	"Siebel - 0222"
	};

	var windows = "<table style=\"width:100%\">";//<tr><th></th><th style=\"width:150px;\"></th><th></th></tr>";
	//var windows = document.createElement("table");
	//windows.insertRow(0);
	var linux = windows;

	function newRow(list, name, datum)
	{
		var percent = (datum.inusecount/datum.machinecount)*100;
		var ratio = datum.inusecount + "/" + datum.machinecount;

		var row = "<tr><td>" + list[name] + ": </td>";
		row += "<td><div class=\"meter1\"><div style=\"width:" + percent + "%;background: ";
		
		if (percent > 66)
			row += "IndianRed;";
		else if (percent > 33)
			row += "orange;";
		else
			row += "LightGreen;";
		
		row += "\"><span>&nbsp</span></div></div></td>";
		row += "<td>" + ratio + "</tr>";

		return row;
	}

	for (var i = 0; i < data.length; i++)
	{
		var name = data[i].strlabname;

		if (name in windowsList)
			windows += newRow(windowsList, name, data[i]);

		else if (name in linuxList)
			linux += newRow(linuxList, name, data[i]);
	}

	windows += "</table>";
	linux += "</table>";

	document.getElementById("windows").innerHTML = windows;
	document.getElementById("linux").innerHTML = linux;
}

function flip()
{
	var w = document.getElementById("windows");
	var l = document.getElementById("linux");
	var h = document.getElementById("heading");
	var s = document.getElementById("switch");

	if (w.hasAttribute("hidden"))
	{
		l.setAttribute("hidden", "");
		w.removeAttribute("hidden");
		h.innerHTML = "Windows";
		s.innerHTML = "Linux";
	}

	else if (l.hasAttribute("hidden"))
	{
		w.setAttribute("hidden", "");
		l.removeAttribute("hidden");
		h.innerHTML = "Linux";
		s.innerHTML = "Windows";
	}
}

document.addEventListener('DOMContentLoaded', getEWSData);
document.getElementById("switch").addEventListener("click", flip);
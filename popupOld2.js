function getEWSData()
{
	var xhr = new XMLHttpRequest();
	xhr.open( 'GET', 'https://my.engr.illinois.edu/labtrack/util_data_json.asp', true );

	xhr.onload = function()
	{
		var response = window.JSON.parse( xhr.responseText ).data;
		fillEWSData(response);
	}

	xhr.send();
}

function fillEWSData(data)
{
	var windowsList =
	{
		"DCL L416" : "DCL - L416",
		"EH 406B1" : "EH - 406B1",
		"EH 406B8" : "EH - 406B8",
		"MEL 1001" : "MechE - 1001",
		"MEL 1009" : "MechE - 1009",
		"GELIB 4th" : "Grainger - 4th"
	};

	var linuxList = 
	{
		"DCL L440" : "DCL - L440",
		"DCL L520" : "DCL - L520",
		"EVRT 252" : "Everitt - 252",
		"GELIB 057" : "Grainger - 057",
		"SIEBL 0218" : "Siebel - 0218",
		"SIEBL 0220" : "Siebel - 0220",
		"SIEBL 0222" : "Siebel - 0222"
	};

	var windows = "<table><tr><th>Lab Name</th><th style=\"width:150px;\">Utilization</th><th></th></tr>";
	var linux = windows;

	for (var i = 0; i < data.length; i++)
	{
		var percent = (data[i].inusecount/data[i].machinecount)*100;
		var ratio = data[i].inusecount + "/" + data[i].machinecount;
		// iterate through windows list
		for (var w in windowsList)
		{
			if (data[i].strlabname == w)
			{
				windows += "<tr><td>" + windowsList[w] + ": </td>";
				windows += "<td><div class=\"meter1\"><div class=\"meter2\" style=\"width:" + percent + "%;background: ";
				
				if (percent > 66)
					windows += "IndianRed;";
				else if (percent > 33)
					windows += "orange;";
				else
					windows += "LightGreen;";
				
				windows += "\"><span>&nbsp</span></div></div></td>";
				windows += "<td>" + ratio + "</tr>";
			}
		}

		// iterate through linux list
		for (var l in linuxList)
		{
			if (data[i].strlabname == l)
			{
				linux += "<tr><td>" + linuxList[l] + ": </td>";
				linux += "<td><div class=\"meter1\"><div class=\"meter2\" style=\"width:" + percent + "%;background: ";
				
				if (percent > 66)
					linux += "IndianRed;";
				else if (percent > 33)
					linux += "orange;";
				else
					linux += "LightGreen;";
				
				linux += "\"><span>&nbsp</span></div></div></td>";
				linux += "<td>" + ratio + "</tr>";
			}
		}	
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
		l.setAttribute("hidden", '');
		w.removeAttribute("hidden");
		h.innerHTML = 'Windows';
		s.innerHTML = 'Linux';
	}

	else if (l.hasAttribute("hidden"))
	{
		w.setAttribute("hidden", '');
		l.removeAttribute("hidden");
		h.innerHTML = 'Linux';
		s.innerHTML = 'Windows';
	}
}

function start()
{
	getEWSData();
	document.getElementById("switch").onclick = flip;
}

document.addEventListener('DOMContentLoaded', start);


/* To do: change to using objects instead of innerHTML */
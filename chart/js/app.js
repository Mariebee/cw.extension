//this js file will make ajax call to data.php to fetch the data 

$(document).ready(function(){
	$.ajax({
		url: "http://localhost/chartjs/data.php",    // here I am not sure from where we will take our the data from 
		                                             // this is my directory
		method: "GET",
		success: function(data) { //if we are able to get the data execute the below
			console.log(data);
			//declare some variable
			var content_id = []; // this will go into x axis
			var content = [];    // this will go into y axis
               
			//loop through data and push values onto the declared arrays
			for(var i in data) {
				content_id.push("Content_is " + data[i].content_id);
				content.push(data[i].content);
			}
			
			
             //this part is related to the chart
			var chartdata = {
				labels: content_id,
				datasets : [
					{
						label: 'Content_id',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba(200, 200, 200, 0.75)',
						hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
						hoverBorderColor: 'rgba(200, 200, 200, 1)',
						data: Content
					}
				]
			};

			//this comes from the graph.HTML file 'id = mycanvas'
			var x = $("#mycanvas");
			
           //create graph object to make the actual graph
			var barGraph = new Chart(x, {
			    //specify some parameters
				type: 'bar',
				data: chartdata
			});
		},
		error: function(data) {
			console.log(data);
		}
	});
});
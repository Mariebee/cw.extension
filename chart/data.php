//this file will fetch data from mysql table and will output result in json format

<?php
//setting header to json
header('Content-Type: application/json');

//database
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'yourPassword');
define('DB_NAME', 'sys');

//this is where we connect to the database
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

//this is where we check if connection was established
if(!$mysqli){
	die("Connection failed: " . $mysqli->error);   //if no connection ---throw error
}

//otherwise continue and get data from the table
$query = sprintf("SELECT content_id, content FROM content ORDER BY content_id"); //!!!! THIS IS WHAT'S UNCLEAR...HOW TO PASS OUR DATA THAT IS INTERACTIVE

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();                       // define array
foreach ($result as $row) {            // loop through data
	$data[] = $row;                    //populate the array with our data
}
// now our data is in the array $data

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data); // this changes php into JSON and returns
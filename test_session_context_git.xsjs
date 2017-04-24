var conn = $.hdb.getConnection();
//var conn = $.db.getConnection();
var results = {}; 
results.data = [];
var out_data = {}; 
var input_parameters = {};

input_parameters = JSON.parse($.request.body.asString());
out_data.inp = input_parameters;

var sqlstring = "SELECT 'This is test1' FROM DUMMY";


try{
	var prep_procedure = conn.loadProcedure('SANKAPUR','TEST_SESSION');
//	var proc_execute = prep_procedure();
	out_data = prep_procedure();
	conn.commit();		
	
	out_data.summary_grid = conn.executeQuery(sqlstring);
//	out_data.summary_grid = conn.executeUpdate(sqlstring);  
    for(var y = 0; y < out_data.summary_grid.length; ++y){
        results.data.push(out_data.summary_grid[y]);
    }
	$.response.status = $.net.http.OK;  
    $.response.contentType = "application/json"; 
    $.response.setBody(JSON.stringify(results));
//	$.response.setBody(JSON.stringify("Done"));


    
} catch (err) {
	$.response.setBody(err.message + " - Error retrieving data from HANA." ); 
}
conn.close();


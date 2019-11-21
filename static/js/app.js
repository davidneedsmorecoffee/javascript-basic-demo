// from data.js
var tableData = data;

// INSTRUCTIONS
// Level 1: Automatic Table and Date Search (Required)
// Create a basic HTML web page or use the index.html file provided 
// (we recommend building your own custom page!).
// Using the UFO dataset provided in the form of an array of JavaScript objects, 
// write code that appends a table to your web page and then adds new rows of data for each UFO sighting.

// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Use a date form in your HTML document and 
// write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.

var filter_table_button = d3.select("#filter-btn"); 
var tbody = d3.select("tbody");

// METHOD 2 - this one uses the columns defined earlier
// advantage of this method is that if the data.js has missing data the cell will be blank in the table
function populate_table(tableData){
    tableData.forEach((report) => {
        // for each report, append tr (table row) to the tbody
        var row = tbody.append("tr");
        // for each column, append the i-th entry from the report as td. 
        Object.values(columns).forEach((i) => {
            var tcell = row.append("td");
            tcell.text(report[i]);
            }    
        );
    });
}
populate_table(tableData) 


// METHOD 1 - the syntax method is a bit more straightforward and doesn't require defining columns
// but the disadvantage is that if any of the reports have different number of fields the append will be 'off' when populating the table
// 14_03_03-Evr_D3_Table
// 14_02_07-Ins_Object_Iteration <- more relevant
// Use `Object.values` and `forEach` to iterate through values

// function populate_table(data){
//     data.forEach((report) => {
//         // for each report, append tr (table row) to the tbody
//         var row = tbody.append("tr");
//         // for each i-th value in a given report, append as table data
//         // i.e., append a cell to the row for each value
//         Object.values(report).forEach(i => {
//             var tcell = row.append("td");
//             tcell.text(i);
//             console.log(tcell.text(i))
//         });
//     });
// }
// populate_table(data)

// this allows the filter_populate_table to run when the filter_table_button is pressed
filter_table_button.on("click", filter_populate_table)

// normally, after the date is entered, if the user presses Enter, 
// the page would refresh and you wouldn't actually see the filtered result
// this is a way to get around it so that both pressing the Enter or clicking on the Filter by Date button both work
// https://stackoverflow.com/questions/12642571/call-a-function-when-the-enter-button-is-pressed-via-javascript
// https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
document.getElementById('datetime').onkeydown = function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // no need for this line if <form> and </form> on lines 35 and 45 of the html file is commented out
        //alert('Why didn\'t you use the filter table button? ;)');
        filter_populate_table();
    }
}

// here we actually define the filter_populate_table function
function filter_populate_table() {
    //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
    // clear the table body
    tbody.html("");
    // select the field where the datetime is entered and take the input
    var datetime_field = d3.select("#datetime");
    var datetime_input = datetime_field.property("value");
    console.log(datetime_input);

    // filter by looking for tableData where the datetime equals to the datetime input from the user
    var filtered_data = tableData.filter(i => i.datetime === datetime_input);
        console.log(filtered_data);
        console.log(filtered_data.length)

    // if the filtered_data is not 0 that means there were hits, so populate the table via function defined earlier
    if (filtered_data.length != 0) {
        populate_table(filtered_data);
        }
    // if the filtered_data is 0 that means there were no hits, so populate the table via function defined earlier
    else if (filtered_data.length === 0)
        //alert(`No records found for ${datetime_input}`)
        tbody.append("td").text(`No records found!`); 
}


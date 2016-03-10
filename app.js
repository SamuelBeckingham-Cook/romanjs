/**
 * Created by Samuel Beckingham-Cook on 10/03/2016.
 */

function convert() {
    var input = document.getElementById('converter').value;
    document.getElementById('result').value = Roman.convertTo(input);
}
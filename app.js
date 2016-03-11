/**
 * Created by Samuel Beckingham-Cook on 10/03/2016.
 */

function romanconvertto() {
    var input = document.getElementById('numberInput').value;
    document.getElementById('numeralInput').value = Roman.convertTo(input);
}

function romanconvertfrom() {
    var input = document.getElementById('numeralInput').value;
    document.getElementById('numberInput').value = Roman.convertFrom(input);
}
function displayTime() {
		var dict = {
  '0':"Sunday",
  '1':"Monday",
  '2':"Tuesday",
  '3':"Wednesday",
  '4':"Thursday",
  '5':"Friday",
  '6':"Saturday",
};
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var day = dateTime.getDay();
    day = dict[day]

    //console.log(dateTime);
    if (hrs > 12) {
        hrs = hrs - 12;
    }

    if (hrs == 10 && min==36) {
       // console.log("HELLO");
    }

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    document.getElementById('day').innerHTML = day;
    
}

setInterval(displayTime);
let counter = 0;

// function hello() {
//     counter++;
// }
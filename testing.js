// =====================================  importing firebase  ==========================
import {
	initializeApp
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
	getDatabase,
	ref,
	set,
	onValue,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyBRJph0yxSeE3fN_KsUr20p1JI70KsdkSU",
	authDomain: "notice-board-98214.firebaseapp.com",
	databaseURL: "https://notice-board-98214-default-rtdb.firebaseio.com",
	projectId: "notice-board-98214",
	storageBucket: "notice-board-98214.appspot.com",
	messagingSenderId: "389033309038",
	appId: "1:389033309038:web:a370df2638f06c95e8877f",
	measurementId: "G-XHPDGB6341"
};

//=====================================  Initialize Firebase  ==========================

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

// =====================================  decalration  ==========================

var dict = {
	'0': "Sunday",
	'1': "Monday",
	'2': "Tuesday",
	'3': "Wednesday",
	'4': "Thursday",
	'5': "Friday",
	'6': "Saturday",
};

var dict2 = {
	'0': "Sunday",
	'1': "Mon_lab",
	'2': "Tue_lab",
	'3': "Wed_lab",
	'4': "Thu_lab",
	'5': "Fri_lab",
	'6': "Sat_lab",
};

var dateTime = new Date();
var hrs = dateTime.getHours();
var min = dateTime.getMinutes();
var day = dateTime.getDay();
let temp = day
day = dict[day]
// day = "Friday"
let temp2 = dict2[temp]
// temp2 = "Fri_lab"

// array of the lab names
let text3, lec = 0, lab = "none", labname = [];

var labs = ["DL", "CG", "INT", "SL-1", "SL-2", "CR-1", "CR-2", "CR-3", "MP", "HW", "SL-3", "SL-4", "CR-4", "FPL", "PG", "LL-1", "LL-2"];

var ind = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "X"];

var sub = ["AI", "DSBDA", "CC", "WT"];
var att = [27, 25, 28, 28];

// for reference
//var time = [ "09:00", "09:55", "10:50","11:10","12:05","1:00","2:00", "2:55", "3:50"]

// =====================================  logic  ==========================
//nice functn
function giveindex() {
// hrs = 10;
// min = 30;

	if ((hrs == 9 && min >= 0) || (hrs < 10 && min <= 55))
		return (2)
	else if ((hrs == 9 && min > 55) || (hrs == 10 && min <= 50))
		return (3)
	else if ((hrs == 10 && min > 50) || (hrs == 11 && min <= 10))
		return (4)
	else if ((hrs == 11 && min > 10) || (hrs == 12 && min <= 5))
		return (5)
	else if ((hrs == 12 && min > 5) || (hrs == 13 && min <= 59))
		return (6)
	if ((hrs == 13) || (hrs < 14))
		return (7)
	if ((hrs == 14 && min <= 55))
		return (8)
	if ((hrs == 14 && min > 55) || (hrs == 15 && min <= 50))
		return (9)
	if ((hrs == 15 && min > 50) || (hrs == 16 && min <= 45))
		return (10)
}
let a = []
a[0] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/SE_A'
a[1] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/SE_B'
a[2] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/TE_A'
a[3] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/TE_B'
a[4] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/BE_A'
a[5] = '1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/BE_B'

let i = 0


for (i; i < 6; i++) {
	const ReadData = ref(db, a[i]);
	onValue(ReadData, (snapshot) => {

		const data = snapshot.val();
		// console.log(data)
		for (let i = 1; i < data.length; i++) {
			for (let k = 1; k < ind.length - 1; k++) {
				let j = ind[k]
				if (data[i][j] == temp2) {
					// gives the number of lec according to current time
					lec = giveindex();

					// sepearating labs if multiple  
					lab = data[lec][j];
					//console.log(lab)
					labname = lab.split(/(\s+)/).filter(e => e.trim().length > 0)

					for (let i = 0; i < labname.length; i++) {
						text3 = labname[i]

						// reverse check
						text3 = labs.indexOf(text3) + 1
						text3 = labs.at(text3 - 1)

						//elemented id is in show_board.html
						document.getElementById(text3).innerHTML = data[lec][ind[k - 1]];
						let lecture = data[lec][ind[k - 1]].split(',');
						
						if(sub.includes(lecture[0]) && (text3=="CR-1" || text3=="CR-3"))
						{
							let i = sub.indexOf(lecture[0]);
							att[i]++;
							console.log(lecture[0],att[i]);
							if(att[i] == 32)
							{
								alert("bro, 75% complete")
							}
						}

						//consoling out final output
						console.log("current lab : ", text3)
						console.log("current lec : ", data[lec][ind[k - 1]])
						console.log("next lab : ", data[lec + 1][j])
						console.log("next lec : ", data[lec + 1][ind[k - 1]])

						// alloting sepearate path for final output
						set(ref(db, `${text3}/`),
							{
								current_lec: text3 + " " + data[lec][ind[k - 1]],
								next: data[lec + 1][j] + " " + data[lec + 1][ind[k - 1]]
							})
					}
				}
			}
		}
	});
}


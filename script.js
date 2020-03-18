
const xhr = new XMLHttpRequest();

const url = "getFile.php";
xhr.responseType = "json";
xhr.open("POST", url);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send();
xhr.onerror = error_conect
xhr.onload = function () {
	if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
		error_conect() // Например, 404: Not Found
	} else { // если всё прошло гладко, выводим результат
		arrayWord = xhr.response;
		printWord()
	}
};

function error_conect() {
	text.innerHTML = `<h2 style='color:red'>ошибка</h2>${xhr.status}: ${xhr.statusText}`
};
let arrayWord = {};
let stringEng = "";
let stringRu = "";
let arrayElementSound = [];
let text = document.getElementById('text')
let eng = document.getElementById('eng')
let ru = document.getElementById('ru')
let log = document.getElementById('log')
let fon = document.getElementById('fon')
let a = document.getElementById('a')
let b = document.getElementById('b')
let c = document.getElementById('c')
let err = document.querySelectorAll('[src^="error/e"]')
let keybord = document.querySelector('.keybord')
let indexEng = [0];

function printWord() {
	for (let index = 0; index < arrayWord.eng.length; index++) {
		stringEng += arrayWord.eng[index] + " ";
		indexEng.push(stringEng.length);
		arrayElementSound[index] = document.createElement("audio")
		arrayElementSound[index].src = "eng/" + arrayWord.eng[index] + ".wav "
		text.after(arrayElementSound[index])
		arrayElementSound[index].preload = "metadata"
	}
	//stringEng=`In my eyes, indisposed In disguises no one knows Hides the face, lies the snake The sun in my disgrace Boiling heat, summer stench Neath the black the sky looks dead Call my name through the cream And I'll hear you scream again Black hole sun Won't you come And wash away the rain Black hole sun Won't you come Won't you come`
	c.innerHTML = stringEng
	window.onkeydown = pressDown;
	showNextKey();
}

let index = 0;
let indexSound = 0;
let indexError = 0;
let flagTime = 1
let count
let error = 0;
let timer = document.getElementById(`timer`)
let leg = document.getElementById('leg')
let fonNext = document.getElementById('next')
let fonError = document.getElementById('error')
let interval
let speed = [];
let speedTotal = [];
let countError = 0;
let flagEnd;
let intervwlRainbow;
let end

function pressDown(e) {
	let key = e.key;
	console.log(key);
	if (key === "Backspace") {
		flagEnd = 0;
		fon.style.backgroundColor="gray"
		clearInterval(intervwlRainbow);
		back();
	}
	if (flagEnd) { end(); return }
	if (key.length > 1) {
		console.log("no!");
		return;
	}
	if (key === stringEng[index]) {
		if (flagTime) {
			count = Date.now();
			flagTime = 0;
		}
		a.innerText = stringEng.slice(0, index + 1)
		b.innerText = stringEng.slice(index + 1, index + 2)
		c.innerText = stringEng.slice(index + 2, stringEng.length)
		index++;
		if (key === " ") {
			let duration = Date.now() - count;
			let numW = arrayWord.eng[indexSound].length + 1;
			speedTotal[indexSound] = duration;
			speed[indexSound] = Math.floor(numW / (duration / 1000) * 60)
			flagTime = 1;
			timer.innerHTML += speed[indexSound] + "<br>"
			ru.innerHTML += arrayWord.ru[indexSound] + "<br>"
			arrayElementSound[indexSound].play();
			indexSound++;
		}
		if (index >= stringEng.length) {
			flagEnd = 1;
			intervwlRainbow=setInterval(rainbow,1000/60)
			end = () => {
				window.onkeydown = ""
				document.querySelector(`[src="tada.wav"]`).play()
				let sumDuraction = speedTotal.reduce((sum, curent) => sum + curent)
				let speedFin = Math.floor(stringEng.length / (sumDuraction / 1000) * 60)
				keybord.remove()
				log.innerHTML = `<x style='color:green'>ваша скорость ${speedFin} знаков/минуту<br></x><x style='color:red'>ошибки: ${error}</x>`
			}
		} else {
			// дает кообдинаты клавиши на вирт.клавиатуре
			showNextKey();
		}
	}
	else {							// если клавиша с клавы не совпала с буквой из строки
		let xyError = xyKey(key)
		if (xyError) fonError.style.visibility = 'visible'
		fonError.style.left = xyError.x + "px"
		fonError.style.top = xyError.y + "px"
		countError++;
		setTimeout(() => {
			countError--
			if (countError == 0) fonError.style.visibility = "hidden"
		}, 200)
		if (indexError >= err.length) indexError = 0;
		err[indexError].play()
		indexError++
		error++;
	}
}
function showNextKey() {
	let xyNext = xyKey(stringEng.charAt(index))
	if (xyNext) {
		fonNext.style.visibility = 'visible'
		fonNext.style.left = xyNext.x + "px"
		fonNext.style.top = xyNext.y + "px"
	} else fonNext.style.visibility = "hidden"
}
let posKeyEng = [
	[`\`~`, `1!`, `2@`, `3#`, `4$`, `5%`, `6^`, `7&`, `8*`, `9(`, `0)`, `-_`, `+=`],
	['Qq', `Ww`, `Ee`, `Rr`, `Tt`, `Yy`, `Uu`, `Ii`, `Oo`, `Pp`, `[`, `}]`, `\\|`],
	[`Aa`, `Ss`, `Dd`, `Ff`, `Gg`, `Hh`, `Jj`, `Kk`, `Ll`, `:;`, `"'`],
	[`Zz`, `Xx`, `Cc`, `Vv`, `Bb`, `Nn`, `Mm`, `<,`, `>.`, `?/`]
]
function xyKey(c) {
	for (let y = 0; y < posKeyEng.length; y++) {
		for (let x = 0; x < posKeyEng[y].length; x++) {
			let strKey = posKeyEng[y][x] // символы клавиши
			if (strKey.includes(c)) {
				let offsetX = 0;
				if (y == 1) offsetX = 75
				if (y == 2) offsetX = 88
				if (y == 3) offsetX = 113
				return { x: x * 50 + offsetX, y: y * 50 };
			}
		}
	}
	return 0
}
let t, rus
function back() {
	flagTime = 1;
	if (indexEng[indexSound] == index) { // если курсор в начале слова
		if (indexSound) {
			indexSound--;
		}
		t = timer.innerHTML.replace(/\d+\<br\>$/, "")
		rus = ru.innerHTML.replace(/[^>]+\<br\>$/, "")
		timer.innerHTML = t;
		ru.innerHTML = rus;
	}
	index = indexEng[indexSound]
	a.innerText = stringEng.slice(0, index)
	b.innerText = stringEng.slice(index, index + 1)
	c.innerText = stringEng.slice(index + 1, stringEng.length)
	showNextKey();
}
let hue=85;
function rainbow(){
	hue += 1;
fon.style.backgroundColor=`hsl(${hue}, 100%, 50%)`
}
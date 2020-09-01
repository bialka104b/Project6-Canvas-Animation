
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

context.fillStyle = '#ffff00';
context.fillRect(0, 0, 100, 50);//prostokąt

context.beginPath();//tu zaczynamy rysować
context.lineWidth = 5;//grubosc lini
context.strokeStyle = '#ffd000';// kolor lini
context.moveTo(50, 50);//rysujemy od pozycji 50 50
context.lineTo(120,100);//pierwsza linia
context.lineTo(150,106);//druga l
context.lineTo(50,160);//trzecia l
context.closePath();//koniec rysowania
context.stroke();//wypełnienie lini aby były widoczne
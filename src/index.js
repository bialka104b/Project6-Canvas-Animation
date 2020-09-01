import "./scss/index.scss"; //style w sass
class Niebo {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = window.innerWidth; //pobieramy szerokość przegladarki
    this.height = window.innerHeight; //pobieramy wysokość przegladarki
  }

  initializationCanvas() {
    //funkcja inicjalizująca canvas na całej szerokości i wysokości ekranu
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context.fillStyle = "#ffff00";
    this.context.fillRect(0, 0, this.width, this.height); //prostokąt
  }

  drawStar(star) {
    this.context.save(); //zapisanie stanu kanwasa

    this.context.fillStyle = star.color; //ustawiamy kolor gwiazdy
    this.context.beginPath(); //tu zaczynamy rysować
    this.context.translate(star.x, star.y); //rysujemy od pozycji x i y naszej gwiazdy(środek naszej gwiazdki)
    this.context.moveTo(0, 0 - star.radius); //ustawiamy się na czubku gwiazdy

    for (let i = 0; i < 4; i++) {
      //pętla do rysowania ramion gwiazdy
      this.context.rotate((Math.PI / 180) * 45); //chcemy sie obrócic o 450stopni(wyrażona wartość w radianach)
      // 360:4 ramiona = 90 ,  360:8 = 45
      this.context.lineTo(0, (0 - star.radius*0.5) * 0.5);//linia do środka gwiazdy
      this.context.rotate((Math.PI / 180) * 45); //chcemy sie obrócic o 45stopni(wyrażona wartość w radianach)
      // 360:4 ramiona = 90
      this.context.lineTo(0, 0 - star.radius); //linia na zewnątrz gwiazdy
    }
    // this.context.closePath(); //koniec rysowania
    // this.context.stroke(); //wypełnienie lini aby były widoczne
    this.context.fill(); //wypełnienie gwiazdy kolorem
    this.context.restore(); //przywracanie stanu kanwasa
  }

  draw() {
    //czyszczenie kanwasa, rysowanie gwiazd, animowanie gwiazd, aktualizacja ich pozycji
    //console.log('draw');
    window.requestAnimationFrame(() => this.draw()); //funkcja do obsługi animacji, zastosowana rekurencja
  }

  activationOfDrawing() {
    //uruchomienie rysowania
    this.initializationCanvas();
    this.draw();
    // this.drawStar({//próbne wywołanie gwiazdki
    //   x: 100, //pozycja
    //   y: 200,
    //   color: "red", //kolor
    //   radius: 50, //promień gwiazdy
    // });
  }

  // context.lineWidth = 5;//grubosc lini
  // context.strokeStyle = '#ffd000';// kolor lini

  // context.lineTo(120,100);//pierwsza linia
  // context.lineTo(150,106);//druga l
  // context.lineTo(50,160);//trzecia l
  // context.closePath();//koniec rysowania
  // context.stroke();//wypełnienie lini aby były widoczne
}

const niebo = new Niebo(document.querySelector("#canvas"));
niebo.activationOfDrawing();

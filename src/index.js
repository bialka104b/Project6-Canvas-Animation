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

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height); //prostokąt
  }

  generatedStars(counter) {
    //generator gwiazd, counter(ilość gwiazd do wygenerowania)
    let stars = [];
    for (let i = 0; i < counter; i++) {
      const radiusRandom = Math.random() * 20 + 10; //stała przetrzymująca promień gwiazdy
      //random() domyślnie zwraca wartości 0 do 1, dodanie 10 pozwoli uzyskac wielkość od 20 do 30
      stars.push({
        //dodajemy nowy element do naszej tablicy
        x: Math.random() * this.width, //losujemy pozycje x od 0 do szerokości ekranu
        y: Math.random() * this.height, //losujemy pozycje y od 0 do wysokości ekranu
        radius: radiusRandom,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, //metoda do losowego koloru gwiazdek
      });
    }

    this.stars = stars;
  }
  draw_Stars() {
    //rysowanie wielu gwiazd
    this.stars.forEach((star) => {
      //za pomoca pętli rysujemy wiele gwiazdek przechodząc po każdym elemencie tablicy star
      this.drawStar(star);
    });
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
      this.context.lineTo(0, (0 - star.radius * 0.5) * 0.5); //linia do środka gwiazdy
      this.context.rotate((Math.PI / 180) * 45); //chcemy sie obrócic o 45stopni(wyrażona wartość w radianach)
      // 360:4 ramiona = 90
      this.context.lineTo(0, 0 - star.radius); //linia na zewnątrz gwiazdy
    }

    this.context.fill(); //wypełnienie gwiazdy kolorem
    this.context.restore(); //przywracanie stanu kanwasa
  }

  draw() {
    //czyszczenie kanwasa, rysowanie gwiazd, animowanie gwiazd, aktualizacja ich pozycji
    //console.log('draw');
    window.requestAnimationFrame(() => this.draw()); //funkcja do obsługi animacji, zastosowana rekurencja
    this.draw_Stars();
  }

  activationOfDrawing() {
    //uruchomienie rysowania
    this.initializationCanvas();
    this.generatedStars(30); //parametr ilość generowanych gwiazd
    this.draw();
    // this.drawStar({//próbne wywołanie gwiazdki
    //   x: 100, //pozycja
    //   y: 200,
    //   color: "red", //kolor
    //   radius: 50, //promień gwiazdy
    // });
  }
}

const niebo = new Niebo(document.querySelector("#canvas"));
niebo.activationOfDrawing();

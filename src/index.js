import "./scss/index.scss"; //style w sass
class Niebo {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = window.innerWidth; //pobieramy szerokość przegladarki
    this.height = window.innerHeight; //pobieramy wysokość przegladarki
    this.lastConstelation = 0;//zmienna do przechowywania kiedy wyrenderowała sie ostatnia konstelacja
    this.nextConstellation = Math.random()*3000;//kiedy ma zostac wygenerowana pierwsza konstelacja(po 0 do 3000 sek)
    this.constellation = {
      stars:[],
      isClosed: false,
      width: null//aktualna szerokośc lini w konstelacji
    }
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
        radius2: radiusRandom,
        color: `#${Math.floor(Math.random() * 16777215 + 500).toString(16)}`, //metoda do losowego koloru gwiazdek
        speed: Math.random() + 0.4, //szybkość poruszania sie gwiazdy od 0 do 2
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

  updateStars() {
    //przechodź pętlą po każdej gwiazdce z osobna i zaktualizuj
    this.stars.forEach((star) => {
      star.x = star.x + star.speed; //zmiana prędkości każdej z gwiazd
      star.y = star.y - (star.speed * (this.width / 2 - star.x)) / 1500;
      star.radius = star.radius2 * (Math.random() / 3 + 0.9); //migotanie gwiazd

      if (star.x > this.width) {
        //jeśli gwiazda przekroczy szerokość ekranu to wraca na początek ekranu
        star.x = 0;
      }
      if (star.y > this.height || star.y < 0) {
        star.x = (Math.random() * this.width) / 2;
        star.y = (Math.random() * this.height) / 5 + (this.height / 5) * 3;
      }
    });
  }

  generatedRadomConstellation() {
    const x = this.width / 2 + Math.random() * 0.8 * this.width - this.width / 2;
    const y = this.height / 2 + Math.random() * 0.8 * this.height - this.height / 2;
    const radius = (this.height / 2) * Math.random() * 0.5 + 0.5;

    this.constellation = {
      stars: this.stars
        .filter((star) => {
          //zbiór gwiazd tworzymy na podstawie oryginalnej tablicy gwiazd
          return (
            star.x > x - radius && //sprawdzam czy pozycja x gwiazdy jest większa od środka okręgu minus promień (x - radius)
            star.x < x + radius && //sprawdzam czy pozycja x gwiazdy nie wychodzi poza prawą strone okręgu o promieniu radius
            star.y > y - radius &&
            star.y < y + radius
          );
        })
        .slice(0, Math.round(Math.random() * 8 + 2)), //obciecie naszej tablicy tak aby konstelacja miala od 3 do 7 gwiazd
        isClosed: Math.random() > 0.5,
        width:2
    };
  }

  updateParametersConstellation(){
    if(this.constellation.width>0){//jeśli szerokośc konstelacji  > 0
      this.constellation.width = this.constellation.width - 0.07;
    } else {
      this.constellation.width = 0;
    }
  }

  drawConstellation() {
    //rysowanie konstelacji
    const { stars, isClosed, width } = this.constellation; //odczyt zbioru gwiazd naszej konstelacji
    const starCounter = stars.length; //odczyt ile jest gwiazd w tym okręgu

    if (starCounter > 1) {
      //konstelacje rysujemy tylko wtedy jeśli jest conajmniej 2 wylosowane gwiazdy()obsługa błędu
      const firstStar = stars[0];

      this.context.beginPath();
      this.context.moveTo(firstStar.x, firstStar.y); //pozycja pierwszej gwiazdy
      this.context.lineTo(stars[1].x, stars[1].y); //[pierwsza linia między pierwsza a druga gwiazdą]

      for (let i = 1; i < starCounter - 1; i++) {
        const next_star = stars[i + 1];
        this.context.lineTo(next_star.x, next_star.y); //[druga linia między druga gwiazdą i trzecią i tak dalej
      }
      if(isClosed){
        this.context.lineTo(firstStar.x, firstStar.y); //konstelacja będzie zawsze zamknięta
      }

      this.context.strokeStyle = "white";
      this.context.lineWidth = width;
      this.context.stroke();
    }
  }

  drawBackground() {
    //rysowanie gradientowego tła
    let gradient = this.context.createRadialGradient(
      this.width / 2, //x
      this.height / 2, //y
      250, //promień
      this.width / 2,
      this.height / 2,
      this.width / 2, //promień
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.8)");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  clearCanvas() {
    //metoda do czyszczenia canvasa za każdym rysowaniem gwiazdy
    this.context.fillStyle = "black"; //kolor tła
    this.context.fillRect(0, 0, this.width, this.height); //rysowanie prostokąta na nowo
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

  draw(now) {//now to czas od ostatniego renderu
    //czyszczenie kanwasa, rysowanie gwiazd, animowanie gwiazd, aktualizacja ich pozycji
    //console.log(now);
    this.clearCanvas(); //czyszczenie
    this.draw_Stars(); //rysowanie
    this.updateStars(); //aktualizacja
    this.drawConstellation();
    this.updateParametersConstellation();
    this.drawBackground(); //tło

    if(now - this.lastConstelation> this.nextConstellation){//jesli aktualny czas minus czas ostatniej konstelacji
      this.lastConstelation = now;//aktualizujemy czasy
      this.nextConstellation = Math.random()*3000 +1000;
      this.generatedRadomConstellation();
    }

    window.requestAnimationFrame((now) => this.draw(now)); //funkcja do obsługi animacji, zastosowana rekurencja
  }

  activationOfDrawing() {//run()
    //uruchomienie rysowania
    this.initializationCanvas();
    this.generatedStars(100); //parametr ilość generowanych gwiazd
    // this.generatedRadomConstellation();
    this.draw();
  }
}

const niebo = new Niebo(document.querySelector("#canvas"));
niebo.activationOfDrawing();

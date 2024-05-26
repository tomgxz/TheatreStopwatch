class Stopwatch {
    constructor(id,text,num_element,desc_element,from_session=false,session_data="") {
        this.id = id;
        this.text = text;
        this.el_main = num_element;
        this.el_desc = desc_element;

        this.interval = null;

        if (from_session) {
            let data = JSON.parse(session_data)

            this.hours = data.hours;
            this.minutes = data.minutes;
            this.seconds = data.seconds;
            this.started = data.started;
            this.finished = data.finished;

            this.update()

            if (this.started) this.el_desc.text(`Since ${this.text}`);
            else this.el_desc.text("Press space to start stopwatch");

        } else {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.started = false;
            this.finished = false;

            this.el_main.text("00:00");
            this.el_desc.text("Press space to start stopwatch");
        }


        this.el_main.addClass("stopwatch_waiting");

        sessionStorage.setItem(`stopwatch_${this.id}`,JSON.stringify({
            id: this.id,
            text: this.text,
            el_main: this.el_main,
            el_desc: this.el_desc,

            hours: this.hours, minutes: this.minutes, seconds: this.seconds,
            started: this.started, finished: this.finished
        }));

        if (this.started && !this.finished) this.start();
        if (this.finished) this.finish();

    }

    update() {
        let hours = this.hours.toString(), minutes = this.minutes.toString(), seconds = this.seconds.toString(), output;

        if (this.hours < 10) hours = `0${hours}`;
        if (this.minutes < 10) minutes = `0${minutes}`;
        if (this.seconds < 10) seconds = `0${seconds}`;

        output = `${hours}:${minutes}:${seconds}`
        if (this.hours < 1) output = `${minutes}:${seconds}`

        this.el_main.text(output)

        this.store()
    }

    start() {
        if (this.finished) return;

        this.started = true;

        this.el_main.addClass("stopwatch_active").removeClass("stopwatch_waiting")
        this.el_desc.text(`Since ${this.text}`)

        this.interval = setInterval(() => {

            this.seconds++;
    
            if (this.seconds >= 60) {
                this.seconds-=60;
                this.minutes++;
    
                if (this.minutes >= 60) {
                    this.minutes-=60;
                    this.hours++;
                }
            }
    
            this.update();

        }, 1000)
    }

    finish() {
        if (this.finished) return;

        this.started = false;
        this.finished = true;

        this.el_main.addClass("stopwatch_finished").removeClass("stopwatch_active")

        clearInterval(this.interval)
    }

    store() {
        let dict = JSON.parse(sessionStorage.getItem(`stopwatch_${this.id}`));

        console.log(dict)
        
        dict.hours = this.hours; dict.minutes = this.minutes; dict.seconds = this.seconds;
        dict.started = this.started; dict.finished = this.finished;

        sessionStorage.setItem(`stopwatch_${this.id}`,JSON.stringify(dict));
    }

}

var main_stopwatch;

if (Object.keys(sessionStorage).includes("stopwatch_main")) {
    let popup = confirm("We have found an existing stopwatch, do you want to continue it?")

    if (popup) main_stopwatch = new Stopwatch("main","Clearance",$("h1"),$("h2"),true,sessionStorage.getItem("stopwatch_main"))
    else main_stopwatch = new Stopwatch("main","Clearance",$("h1"),$("h2"))
}

$(document.body).on("keydown",function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
        if (main_stopwatch.started) main_stopwatch.finish();
        else main_stopwatch.start();
    }
})

class Stopwatch {
    constructor(_name,text,num_element,desc_element) {
        this.name = _name;
        this.text = text;
        this.el_main = num_element;
        this.el_desc = desc_element;

        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.started = false;
        this.finished = false;
        this.interval = null;

        this.el_main.text("00:00");
        this.el_desc.text("Press space to start stopwatch");

        this.el_main.addClass("stopwatch_waiting");
    }

    update() {
        let hours = this.hours.toString(), minutes = this.minutes.toString(), seconds = this.seconds.toString(), output;

        if (this.hours < 10) hours = `0${hours}`;
        if (this.minutes < 10) minutes = `0${minutes}`;
        if (this.seconds < 10) seconds = `0${seconds}`;

        output = `${hours}:${minutes}:${seconds}`
        if (this.hours < 1) output = `${minutes}:${seconds}`

        this.el_main.text(output)
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

}

var main_stopwatch = new Stopwatch("main","Clearance",$("h1"),$("h2"))

$(document.body).on("keydown",function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
        if (main_stopwatch.started) main_stopwatch.finish();
        else main_stopwatch.start();
    }
})

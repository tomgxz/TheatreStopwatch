$("h2").text("Since Clearance")
$("h1").text("00:00")
$("h1").addClass("waiting")

var stopwatch_hours = 0,
    stopwatch_minutes = 0,
    stopwatch_seconds = 0,
    stopwatch_started = false,
    stopwatch_finished = false;

const start_stopwatch = () => {
    stopwatch_started = true;
    $("h1").removeClass("waiting")
    
    var interval = setInterval(function () {
    
        stopwatch_seconds++;
    
        if (stopwatch_seconds >= 60) {
            stopwatch_seconds-=60;
            stopwatch_minutes++;
    
            if (stopwatch_minutes >= 60) {
                stopwatch_minutes-=60;
                stopwatch_hours++;
            }
        }
    
        let string_hours = stopwatch_hours.toString(),
            string_minutes = stopwatch_minutes.toString(),
            string_seconds = stopwatch_seconds.toString();
    
        if (string_hours.length <= 1) string_hours = `0${string_hours}`
        if (string_minutes.length <= 1) string_minutes = `0${string_minutes}`
        if (string_seconds.length <= 1) string_seconds = `0${string_seconds}`
    
        let stopwatch_string = `${string_hours}:${string_minutes}:${string_seconds}`
    
        if (string_hours == "00") stopwatch_string = `${string_minutes}:${string_seconds}`
    
        $("h1").text(stopwatch_string)
    
        if (stopwatch_finished) {
            $("h1").addClass("finished")
            clearInterval(interval)
        }
    
    }, 1000)

}

const finish_stopwatch = () => {
    stopwatch_finished = true;
}

$(document.body).on("keydown",function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {
        if (stopwatch_started) finish_stopwatch();
        else start_stopwatch();
    }
})
function Stopwatch() {
    
    //------------- constants ---------------
    const reset_button = document.getElementById("btn--reset");
    const start_button = document.getElementById("btn--start");
    const minutes = document.getElementById("minute");
    const seconds = document.getElementById("second");
    const milliseconds = document.getElementById("millisecond");
    const duration_box = document.getElementById("duration");

    //-------------- event listeners ---------------
    reset_button.addEventListener("click", () => {
        restart();
    });
    start_button.addEventListener("click", () => {
        start();
    });

    //------------- properties --------------
    this.running = false;
    this.duration = 0;
    this.start_time = 0;
    this.stop_time = 0;
    //this.start = start();
    /*this.stop() = stop();
    this.restart() = restart();
    this.update() = update();*/

    //---------------- methods -----------------
    function start() {
        if (this.running === false) {
            restart();
            setTimeout(() => {
                this.running = true;
                this.start_time = new Date();
                update();
                start_button.innerHTML = "Stop";
                start_button.style.border = "0.3px solid red";
                reset_button.disabled = true;
            }, 100);
        } else {
            reset_button.disabled = false;
            stop();
            start_button.innerHTML = "Start";
            start_button.style.border = "0.3px solid green";
        }
    }
    
    function stop() {
        if (this.running === true) {
            this.running = false;
            console.log("runnning: "+ this.running);
            this.stop_time = new Date();
            seconds.innerHTML = 0;
            minutes.innerHTML = 0;
            milliseconds.innerHTML = 0;
            sec_count = 0;
            min_count = 0;
            mil_count = 0;
            this.duration = this.stop_time - this.start_time; 
            console.log(this.duration);
            if (this.duration < 60000) {
                duration_box.innerHTML = this.duration/1000 + " seconds";
            } else {
                var in_seconds = this.duration/1000;
                var to_minutes = Math.floor(in_seconds/60);
                var rem_seconds = Math.floor(in_seconds - (to_minutes * 60));
                if (to_minutes > 1) {
                    minute_ident = " minutes, ";
                } else {
                    minute_ident = " minute, ";
                }
                duration_box.innerHTML = to_minutes + minute_ident + rem_seconds + " seconds";
            }
        }

    }

    function restart() {
        this.running = false;
        this.duration = 0;
        this.start_time = 0;
        this.stop_time = 0;

        minutes.innerHTML = 0;
        seconds.innerHTML = 0;
        milliseconds.innerHTML = 0;
        duration_box.innerHTML = "";
    }

    function update() {
        var min, sec, mill;
        var sec_count = 0;
        var min_count = 0;
        var mil_count = 0;

        setInterval(() => {
            if (this.running === true) {
                if (seconds.innerHTML > 59) {
                    sec_count = 0;
                    min_count += 1;
                } else {
                    sec_count += 1;
                }
                seconds.innerHTML = sec_count;
                minutes.innerHTML = min_count;
            } else {
                return;
            }
        },1000);
        
        setInterval(() => {
            if (this.running === true) {
                if (milliseconds.innerHTML <= 1000) {
                    mil_count += 1;
                } else {
                    mil_count = 0;
                }
                milliseconds.innerHTML = mil_count;
            }
        },1);
    }

}

sw = new Stopwatch(false,0,0,0);
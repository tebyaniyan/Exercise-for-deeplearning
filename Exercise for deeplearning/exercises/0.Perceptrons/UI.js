import './style.sass'

class UI {
    constructor (app) {
        this.app = app;
        document.body.innerHTML += `
            <section>
                <input class="color-picker" type="color" /> is <span class="guess">cold</span>
            </section>
            <main>
                <div class="sample"></div>
                <button class="is-warm">Is Warm</button>
                <button class="is-not-warm">Is Cold</button>
            </main>
        `
        this.sample = $('.sample');
        this.isWarmBtn = $('.is-warm');
        this.isNotWarmBtn = $('.is-not-warm');
        this.colorPicker = $('.color-picker');
        this.guessKeeper = $('.guess');
        this.colors = null;
        this.isWarmBtn.onclick = () => this.answer('warm');
        this.isNotWarmBtn.onclick = () => this.answer('not-warm');
        this.colorPicker.onchange = () => this.guessKeeper.innerHTML = (this.app.guess(this.colorPicker.value) === 1 ? 'warm' : 'cold');
        this.ask();
    }
    ask () {
        const red = Math.floor(rand(0, 255));
        const green = Math.floor(rand(0, 255));
        const blue = Math.floor(rand(0, 255));
        this.sample.style.background = `rgb(${red},${green},${blue})`;
        this.colors = [red, green, blue];
    }
    answer (target) {
        if (this.colors) {
            this.app.onAnswer([].concat(this.colors), target);
            this.colors = null;
            this.ask();
        }
    }
}

export default UI;
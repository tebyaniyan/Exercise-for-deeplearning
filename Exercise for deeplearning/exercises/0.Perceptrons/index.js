import D0 from 'd0'

window.rand = (a, b) => Math.random() * (b - a) + a;
window.$ = (query) => document.querySelector(query);
window.$$ = (query) => document.querySelectorAll(query);

import Perceptron from './Perceptron'
import UI from './UI'

class App {
    constructor () {
        this.ui = new UI(this);
        const weights = localStorage['weights'] !== undefined ? JSON.parse(localStorage['weights']) : null;
        this.perceptron = new Perceptron(3, weights);
        this.storeWeightsOfPerceptron();
    }
    onAnswer (colors, answer) {
        const inputs = [colors[0]/255, colors[1]/255, colors[2]/255];
        const target = answer === 'warm' ? 1 : -1;
        this.perceptron.train(inputs, target);
        this.storeWeightsOfPerceptron();
    }
    storeWeightsOfPerceptron () {
        console.log(this.perceptron.weights);
        localStorage['weights'] = JSON.stringify(this.perceptron.weights);
    }
    guess (red, green, blue) {
        if (typeof red === 'string') {
            blue = parseInt(red.substr(5, 2), 16);
            green = parseInt(red.substr(3, 2), 16);
            red = parseInt(red.substr(1, 2), 16);
        }
        return this.perceptron.guess([red/255, green/255, blue/255]);
    }
}

window.app = new App;
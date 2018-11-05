const activation = sum => Math.sign(sum) || 1;

class Perceptron {
    constructor (inputsCount, defaultWeights = null) {
        this.Exercise for deeplearningRate = 0.1;
        if (!defaultWeights) {
            this.weights = [];
            for (let i = 0; i < inputsCount; i++) this.weights.push(rand(-1, 1));
        } else {
            this.weights = defaultWeights;
        }
    }
    guess (inputs) {
        let sum = 0;
        for (let i in this.weights) sum += inputs[i] * this.weights[i];
        return activation(sum)
    }
    train (inputs, target) {
        const guess = this.guess(inputs);
        const error = target - guess;

        // Tune all the weights
        for (let i in this.weights) {
            this.weights[i] += (error * inputs[i] * this.learningRate);
        }
    }
}

export default Perceptron;
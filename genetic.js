class individual {
    constructor(weights, values, capacity) {
        this.weights = weights;
        this.values = values;
        this.capacity = capacity;
        this.genes = [];
        this.fitness = 0;
        this.generateGenes();
    }

    generateGenes(){
        for (let i = 0; i < this.weights.length; i++) {
            this.genes.push(Math.random() < 0.5 ? 0 : 1);
        }
    }

    calculateFitness(){
        let totalWeight = 0;
        let totalValue = 0;

        for (let i = 0; i < this.genes.length; i++) {
            if(this.genes[i] === 1){
                totalWeight += this.weights[i];
                totalValue += this.values[i];
            }
        }

        if (totalWeight <= this.capacity) {
            this.fitness = totalValue;
        }else{
            this.fitness = 0;
        }
    }

    crossover(partner) {
        const child = new individual(this.weights, this.values, this.capacity);
        const midpoint = Math.floor(Math.random() * this.genes.length);
        for(let i = 0; i < this.genes.length; i++) {
            child.genes[i] = i < midpoint ? this.genes[i] : partner.genes[i];
        }
        return child;
    }

    mutate(mutateRate) {
        for(let i = 0; i < this.genes.length; i++) {
            if(Math.random() < mutateRate){
                this.genes[i] = this.genes[i] === 1 ? 0 : 1;
            }
        }
    }
}

class GeneticAlgorithm {
    constructor(populationSize, weights, values, capacity, mutationRate) {
        this.populationSize = populationSize;
        this.weights = weights;
        this.values = values;
        this.mutationRate = mutationRate;
        this.population = [];

        for (let i = 0; i < populationSize; i++) {
            this.population.push(new individual(weights, values, capacity));
        }
    }

    evolve(generations) {
        for (let i = 0; i < generations; i++) {
            this.calculateFitness();
            this.naturalSelection();
            this.generareNextGeneration();
        }
        this.calculateFitness();
        this.population.sort((a, b) => b.fitness - a.fitness);
        return this.population[0];
        }

        calculateFitness() {
            for (let individual of this.population) {
                individual.calculateFitness();
            }
        }

        naturalSelection() {
            this.population.sort((a, b) => b.fitness - a.fitness);
            this.population = this.population.slice(0, this.populationSize / 2);
        }

        generareNextGeneration() {
            const newGeneration = [];
            for (let i = 0; i < this.populationSize / 2; i++) {
                const parentA = this.population[Math.floor(Math.random() * this.population.length)];
                const parentB = this.population[Math.floor(Math.random() * this.population.length)];
                const child = parentA.crossover(parentB);
                child.mutate(this.mutationRate);
                newGeneration.push(child);
            }
            this.population = this.population.concat(newGeneration);
        }
    }

//example usage
const weights = [2, 4, 5, 9];
const values = [3, 5, 7, 8];
const capacity = 9;
const populationSize = 88;
const mutationRate = 0.02;
const generations = 100;

const geneticAlgorithm = new GeneticAlgorithm(populationSize, weights, values, capacity, mutationRate);
const result = geneticAlgorithm.evolve(generations);
console.log("Max value: ", result.fitness);
console.log("Indices of items to include: ", result.genes);
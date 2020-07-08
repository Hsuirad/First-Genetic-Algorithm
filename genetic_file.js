class Population{
	constructor(target, mutRate, maxPop){
		this.target = target;
		this.mutRate = mutRate;
		this.maxPop = maxPop;
		this.population = [];
		this.generations = 0;
		this.perfectScore = 1;
		this.finished = false;
		this.best = "";
		this.maxFitness = 0;
		this.indexOfBest = 0;

		for(let i =0; i < this.maxPop; i++){
			this.population.push(this.generateFirstChild());
		}
	}

	calcFitness = (tester, index) => {
		let fitness = 0;

		for(let i = 0; i < this.target.length; i++){
			fitness += (this.target[i] == tester[i] ? 1 : 0);
		}
		fitness/=this.target.length;
		if(this.maxFitness < fitness){
			console.log(this.maxFitness, this.indexOfBest, index);
			this.maxFitness = fitness;
			this.indexOfBest = index;
		}
		return fitness;
	}

	//what we want next is after calculating the fitness to build a mating pool
	
	generateSexers = () => {
		this.matingPool = [];
		this.maxFitness = 0;
		this.indexOfBest = 0;

		for(let i =0; i < this.population.length;i++){
			this.calcFitness(this.population[i], i)
		}

		for(let i = 0; i < this.population.length; i++){
			let x = Math.floor(this.calcFitness(this.population[i]) / this.maxFitness*100);
			//console.log(x + "-");
			for(let j = 0; j < x; j++){
				this.matingPool.push(this.population[i]);
			}
		}

	}

	generateChildren = () => {
		this.generations++;
		this.population = [];
		let pusher = "";

		for(let i = 0; i < this.maxPop; i++){
			this.population.push(this.matingPool[Math.floor(Math.random()*this.matingPool.length)].slice(0,Math.floor(this.target.length/2))+this.matingPool[Math.floor(Math.random()*this.matingPool.length)].slice(Math.floor(this.target.length/2)));

			for(let j = 0; j < this.population[i].length; j++){
				if(Math.random() <= this.mutRate){
					pusher =  String.fromCharCode(Math.floor(Math.random()*57)+65);
					if(pusher == "[") pusher = ".";
					else if(pusher == "\\") pusher = " ";

					this.population[i] = this.population[i].substring(0, j) + pusher + this.population[i].substring(j+1);;
				}
			}
			this.calcFitness(this.population[i], i)
		}

		console.log(this.population[this.indexOfBest], this.maxFitness);
	}

	evaluate = () => {
		if(this.maxFitness == 1){
			return true;
		}
		else{
			return false;
		}
	}

	generateFirstChild = () => {
		let word = "";
		let pusher = "";
		for(let i = 0; i < this.target.length; i++){
			pusher =  String.fromCharCode(Math.floor(Math.random()*57)+65);
			if(pusher == "[") pusher = ".";
			else if(pusher == "\\") pusher = ",";

			word += pusher;
		}
		return word;
	}


}

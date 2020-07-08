//the first param in the class constructor declaration is the phrase to be made, the second is the mutaiton rate, and third is the number of children per generation
let pop = new Population("Test phrase to see.", 0.01, 5000);
let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d')
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c.font = "50px Georgia"
setInterval(function(){if(pop.evaluate() != true && pop.generations < 1000){
	pop.generateSexers();
	pop.generateChildren();
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.font = '30px Georgia';
	c.fillText(pop.population[pop.indexOfBest], canvas.width/10, canvas.height/4)
	c.font = '25px Georgia';
	c.fillText("Generations: " + pop.generations, canvas.width/4, canvas.height/3);
}}, 5);

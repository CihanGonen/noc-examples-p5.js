// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "To be or not to be.";
  popmax = 200;
  mutationRate = .01;
  elitismRate = .005;
  elites = [];

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate,elitismRate, popmax);
}

function draw() {
    // Pick elites
    population.doElitism();

    // Generate mating pool
    population.naturalSelection();
    
    //Create next generation
    population.generate();

    // Calculate fitness
    population.calcFitness();

    population.evaluate();

    // If we found the target phrase, stop
    if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
    }

    displayInfo();
}

function formatDate(difference) {
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let ms =  Math.floor(difference % 1000);
    return  seconds + " sec, "+ ms+ ' ms';
 }

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("<h2>Best phrase:<br>" + answer +"</h2>");

  let statstext = "<h2>total generations:     " + population.getGenerations() + "</h2><br>";
  statstext += "<h2>average fitness:       " + nf(population.getAverageFitness()) + "</h2><br>";
  statstext += "<h2>total population:      " + popmax + "</h2><br>";
  statstext += "<h2>mutation rate:         " + floor(mutationRate * 100) + "%" + "</h2><br>";
  statstext += "<h2>elitism rate:         " + floor(elitismRate * 100) + "%" + "</h2><br>";
  if(population.isFinished()){
    statstext += "<h2>time taken:          " + formatDate(population.end - population.start) +'</h2>' 
  }

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
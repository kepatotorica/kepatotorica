////////////////////// https://leetcode.com/problems/maximum-candies-allocated-to-k-children/description/?envType=daily-question&envId=2025-03-14

function maximumCandies(candies: number[], numberOfChildren: number): number {
    const numberOfStartingPiles = candies.length

    //Need to sort the array from largest to smallest
    candies.sort((a, b) => b - a)


    //Then we need to grab the first item, if there is only one kid, return that item.
    if (numberOfChildren == 1) { return candies[0] }
    //If there is only one item, return the rounded down number of candies/kids
    if (numberOfStartingPiles == 1) {
        return Math.floor(candies[0] / numberOfChildren)
    }


    let maxCandies = candies[0]
    let minCandies = 1
    let midCandies = maxCandies // Start at max, one extra run, but simplifies logic, also helps with weighting considering 0 is less likely.

    //starting at the largest pile, loop from largest to smallest and get a count for k, if you get half way through the list, and you haven't passed k, restart with the next largest
    let numberOfPiles = 0;
    let currentMaxPerChild = 0;
    let lastAttempt = false;

    for(let i = 0; i < candies.length; i++){
        //Might need more here to try the left hand side as a final attempt
        if(lastAttempt && i == candies.length - 1){
            return currentMaxPerChild
        }

        numberOfPiles += Math.floor(candies[i]/midCandies)
        //Might be able to just do numberOfPiles/i < numberOfChildren/i to short cuircit
        // if(i > candies.length/2 && numberOfPiles/2 < numberOfChildren/2){
        if(!lastAttempt){
            const diff = maxCandies - minCandies
            // if(i > 1 && numberOfPiles/i < numberOfChildren/i){
            if(i == candies.length - 1 && numberOfPiles < numberOfChildren){
                i = -1
                numberOfPiles = 0
                if(diff == 1 || diff == 0) {
                    lastAttempt = true
                    maxCandies = minCandies
                    midCandies = minCandies
                }else{
                    maxCandies = midCandies
                    midCandies = Math.floor((maxCandies+minCandies) / 2)
                }
            } else if (numberOfPiles >= numberOfChildren){
                i = -1
                numberOfPiles = 0
                currentMaxPerChild = midCandies
                if(diff == 1 || diff == 0) {
                    lastAttempt = true
                    maxCandies = minCandies
                    midCandies = minCandies
                }else{
                    minCandies = midCandies
                    midCandies = Math.ceil((maxCandies+minCandies) / 2)
                }
            }
        }
    }

    return 0;
};
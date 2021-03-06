/**
 * Merge Sort (Bottom-up / iterative approach)
 * This is a generic implementation of iterative merge sort. No notable optimization is applied.
 * 
 * Author:    Zi Han Meng <zi.han.meng100@gmail.com>
 * Copyright: (c) 2021 Zi Han Meng
 * License:   MIT License <https://github.com/zymzy/mQ-SortingAlgos/blob/master/LICENSE>
 * 
 * Analysis:
 * The time complexity of this algorithm for the best, worst and average case is O(n*log(n)) .
 * This sort is NOT performed in-place.
 * This sort IS stable.
 * 
 * Parameter(s):
 *  arr : An array, to be sorted.
 *  compareFct : A callback function which takes two arguments: "a" and "b", and which returns boolean true if "a" <= "b" and boolean false if otherwise.
 * 
 * Return value:
 *  The sorted array "arr"
 **/
function mergeSortIter(arr, compareFct) {
    let bufferDestination = true; //Indicates where to place the sorted/merged values for next pass
    let buffer = []; //Working buffer would use 1/2 the size of arr
    sort(0, arr.length - 1);
    if (!bufferDestination) for (let i = 0; i < buffer.length; i++) arr[i] = buffer[i];
    return arr;

    function sort(start_i, end_i) {
        let runCount = Math.ceil((end_i - start_i + 1) / 2);
        let runLength = 2;

        for (let i = 0; i < arr.length - 1; i += 2) if (!compareFct(arr[i], arr[i + 1])) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; 

        //While the number of runs to merge is grater than one
        while (runCount > 1) {
            //For a single pass over the data
            for (let i = start_i; i <= end_i; i += 2 * runLength) {
                merge(bufferDestination, i, Math.min(i + runLength, end_i + 1), Math.min(i + 2 * runLength, end_i + 1));
            }
            runCount = Math.ceil(runCount / 2);
            runLength = runLength * 2;
            bufferDestination = !bufferDestination; //Reverse the source and destination array for the next merge pass over the data.
        }  
    };

    function merge(bufferDestination, p, q, r) {
        let src, dst;
        if (bufferDestination) { src = arr; dst = buffer; }
        else { src = buffer; dst = arr; }
        let i = p; j = q; k = p;

        if (q < r) { //Does not execute this branch if "merge()" is called on a tail run. In the case of a tail, there should be "q == r == (end_i + 1)" .
            while (i < q && j < r) {
                if (compareFct(src[i], src[j])) dst[k] = src[i++];
                else dst[k] = src[j++];
                k++
            }
        }
        while (i < q) dst[k++] = src[i++];
        while (j < r) dst[k++] = src[j++];
    };
}


/* Testing section */
//Example callback for numeric sorts.
function compareFct(a, b) {
    return a <= b;
}

//Test the algorithm
function test(arr) {
    let testArr = [];
    if (arr) testArr = arr;
    else for (let i = 0; i < 17; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log('test 1:');
    console.log(testArr.toString());
    console.log(mergeSortIter(testArr, compareFct).toString());
    console.log('test 2:');
    testArr = [];
    for (let i = 0; i < 19; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(mergeSortIter(testArr, compareFct).toString());
    console.log('test 3:');
    testArr = [];
    for (let i = 0; i < 21; i++) testArr.push(Math.floor(Math.random() * 101));
    console.log(testArr.toString());
    console.log(mergeSortIter(testArr, compareFct).toString());
}

function testBulk(arg = 10) {
    let testArr = [];
    if (Number.isInteger(arg)) {
        for (let i = 1; i <= arg; i++) {
            testArr = [];
            for (let j = 0; j < i; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${i}:`);
            console.log(testArr.toString());
            console.log(mergeSortIter(testArr, compareFct).toString());
            console.log(testArr);
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) console.log(`n = ${i}: OK PASSED TEST`);
            else console.log(`n = ${i}: TEST FAILED!`);
        }
    } else if (Array.isArray(arg)) {
        arg.forEach((val, index) => {
            testArr = [];
            for (let j = 0; j < val; j++) testArr.push(Math.floor(Math.random() * 101));
            console.log(`test ${index + 1}:`);
            console.log(testArr.toString());
            console.log(mergeSortIter(testArr, compareFct).toString());
            console.log(testArr);
            if (testArr.reduce((accum, val, index, arr) => { if (val < arr[Math.max(0, index - 1)]) accum = false; return accum;}, true)) console.log(`n = ${val}: OK PASSED TEST`);
            else console.log(`n = ${val}: TEST FAILED!`);
        })
    } else console.log("Invalid argument..");
}

// test([5,4,3,2,1]);
testBulk();


/**
* Stream 
* getNext()
* isEmpty()
**/
function* getAvarageOfSubsequence(stream, k) {
	const numbers = new Map();
	let index = 0;
	let sum = 0;
	
	while(!stream.isEmpty()) {
		const num = stream.getNext();
		numbers.set(index, num);
		sum += num;
		const droppingIndex = index - k + 1;
		index++;
		
		if (droppingIndex >= 0) {
			sum -= numbers.get(droppingIndex);
			numbers.delete(droppingIndex);
			yield sum / k;
		}
	}
}
/*
https://techdevguide.withgoogle.com/resources/former-interview-question-compression-and-decompression/#!

In this exercise, you're going to decompress a compressed string.

Your input is a compressed string of the format number[string] and the decompressed output form should be the string written number times. For example:

The input

3[abc]4[ab]c

Would be output as

abcabcabcababababc

Other rules
Number can have more than one digit. For example, 10[a] is allowed, and just means aaaaaaaaaa

One repetition can occur inside another. For example, 2[3[a]b] decompresses into aaabaaab

Characters allowed as input include digits, small English letters and brackets [ ].

Digits are only to represent amount of repetitions.

Letters are just letters.

Brackets are only part of syntax of writing repeated substring.

Input is always valid, so no need to check its validity.

Learning objectives
This question gives you the chance to practice with strings, recursion, algorithm, compilers, automata, and loops. It’s also an opportunity to work on coding with better efficiency.
*/

function decompress(compressedString) {
	const compressedStringArray = compressedString.split("");
	const stack = new DecompressStack();
	stack.addMultiplier(1);
	stack.handleOpenBracket();
	
	for (let i = 0; i < compressedStringArray.length; i++) {
		const character = compressedStringArray[i];
		
		if (character === "[") {
			stack.handleOpenBracket()
		} else if (character === "]") {
			stack.multiply();
		} else if (Number.isNaN(+character)) {
			stack.addMessage(character);
		} else {
			stack.addMultiplier(character);
		}
	}
	
	return stack.decompress();
}

class DecompressStack {
	
	constructor() {
		this.stack = [];
		this.lastInputWasNumber = false;
	}
	
	get lastElement() {
		const lastIndex = this.stack.length - 1;
		return this.stack[lastIndex];
	}
	
	handleOpenBracket() {
		if (!this.lastInputWasNumber) {
			this.addMultiplier(1);
		}
		this.lastInputWasNumber = false;
	}
	
	addMultiplier(multiplier) {
		if (this.lastInputWasNumber) {
			this.lastElement[0] = `${this.lastElement[0]}${multiplier}`;
		} else {
			this.stack.push([multiplier, ""]);
			this.lastInputWasNumber = true;
		}
	}
	
	addMessage(message) {
		this.lastElement[1] += message;
		this.lastInputWasNumber = false;
	}
	
	multiply() {
		this.addMessage(this.decompress());
	}
	
	decompress() {
		this.lastInputWasNumber = false;
		const [multiplier, message] = this.stack.pop();
		return message.repeat(multiplier);
	}
	
}
function getBestTemperature(apis, timeout) {
	return new Promise((resolve, reject) => {
		let isResolved = false;
		const temperatures = [];
		apis.forEach((api, index) => {
			getTemperature(api).then((temp) => {
				const isBest = index === 0 || temperatures.slice(0, index).every((previousTemp) => previousTemp instanceof Error);
				if (isBest && !isResolved) {
					resolve(temp);
				} 
				
				temperatures[index] = temp;
			}).catch((error) => {
				const nextTemp = temperatures[index + 1];
				if (!Number.isNaN(+nextTemp) && !isResolved) {
					resolve(nextTemp);
				}
				 
				temperatures[index] = error;
			})
		})
		setTimeout(() => {
			const firstBestTemp = temperatures.find((temp) => temp && !(temp instanceof Error));
			if (isResolved) {
				return;
			}
			
			if (!Number.isNaN(+firstBestTemp)) {
				resolve(firstBestTemp);
			} else {
				reject(new Error("Could not find Temperature"));
			}
		}, timeout);
	})
}

function getTemperature(api) {
	const shouldReject = Math.random() < 1/3;
	const timeout = Math.floor(Math.random() * 2000);
	const temp = Math.floor(Math.random() * 40);
	
	console.log(`Reject=${shouldReject} - '${api}' with temp=${temp} and timeout=${timeout}`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldReject) {
				reject(new Error("Internal Server Error"));
			} else {
				resolve(temp)
			}
		}, timeout);
	})
}
const newLetterBoard = async letters => {
	try {
		let res = await fetch('/api/letterboards/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				letters,
			}),
		});
		if (!res.ok) throw res;
		return await res.json();
	} catch (err) {
		console.error(err);
	}
};

module.exports = newLetterBoard;

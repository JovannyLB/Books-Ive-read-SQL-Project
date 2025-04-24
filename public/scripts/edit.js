const textareas = document.querySelectorAll("#bookNote");

function insertTabCharacter(textarea) {
	const { value, selectionStart, selectionEnd } = textarea;

	// Insert tab character
	textarea.value = `${value.substring(0, selectionEnd)}\t${value.substring(selectionEnd)}`;

	// Move cursor to new position
	textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
}

textareas.forEach((textarea) => {
	textarea.addEventListener("keydown", (e) => {
		if (e.key === "Tab") {
			e.preventDefault();
			insertTabCharacter(textarea);
		}
	});
});

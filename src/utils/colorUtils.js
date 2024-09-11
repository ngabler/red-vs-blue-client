export function calculateBackgroundColor(redCount, blueCount) {
	const totalCount = redCount + blueCount;
	if (totalCount === 0) return 'rgb(255, 255, 255)'; // White when no checkboxes are selected

	const bluePercentage = blueCount / totalCount;
	const red = Math.round(255 * (1 - bluePercentage));
	const blue = Math.round(255 * bluePercentage);

	return `rgb(${red}, 0, ${blue})`;
}
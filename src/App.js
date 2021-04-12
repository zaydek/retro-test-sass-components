import sass from "sass-components"

sass.global(`

@use "sass:color";

$shadow: (
	0 0 0 1px hsla(0, 0%, 0%, 0.1),
	0 2px 8px -4px hsla(0, 0%, 0%, 0.25),
);

$focus-shadow: (
	0 0 0 0.5px hsla(210, 100%, 50%, 0.5),
	0 0 0 4px hsla(210, 100%, 50%, 0.25),
);

// Reset
button {
	border: unset;
	background-color: unset;
	&:focus {
		outline: none;
	}
}

`)

const Container = sass.div(`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	gap: 16px;
`)

const Button = sass.button(`
	$gray: hsl(0, 0%, 95%);

	padding: 16px 32px;
	font-size: 18px;
	background-color: $gray;
	border-radius: 8px;
	box-shadow: $shadow;

	&:hover {
		background-color: color.adjust($gray, $lightness: 1.125%);
	}
	&:focus {
		box-shadow: $focus-shadow;
	}

	transition: 200ms cubic-bezier(0, 0, 0.2, 1);
`)

export default function App() {
	return (
		<div>
			<Container>
				<Button>
					Hello, world!
				</Button>
				<Button>
					Hello, world!
				</Button>
			</Container>
		</div>
	)
}

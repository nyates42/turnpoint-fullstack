import React from 'react';
import { IMask, IMaskInput } from 'react-imask';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

export const MaskedDOBInput = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="d{/}`m{/}`Y"
			unmask
			lazy={false}
			overwrite
			blocks={{
				d: {
					mask: IMask.MaskedRange,
					placeholderChar: 'd',
					from: 1,
					to: 31,
					maxLength: 2,
				},
				m: {
					mask: IMask.MaskedRange,
					placeholderChar: 'm',
					from: 1,
					to: 12,
					maxLength: 2,
				},
				Y: {
					mask: IMask.MaskedRange,
					placeholderChar: 'y',
					from: 0,
					to: 9999,
					maxLength: 4,
				},
			}}
			inputRef={ref}
			onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
		/>
	);
});

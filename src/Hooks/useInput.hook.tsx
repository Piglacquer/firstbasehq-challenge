import { useState, ChangeEvent, ChangeEventHandler } from 'react';

type Bind = {
	value: string,
	onChange: ChangeEventHandler,
};

type InputHook = {
	value: string,
	setValue: Function,
	reset: Function,
	bind: Bind,
};

const useInput = (initialValue: string): InputHook => {
	const [ value, setValue ] = useState<string>(initialValue);

	return {
		value,
		setValue,
		reset: () => setValue(''),
		bind: {
			value,
			onChange: (event: ChangeEvent<HTMLInputElement>) => {
				setValue(event.target.value.toString());
			}
		}
	};
};

export { useInput };
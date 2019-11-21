import * as React from 'react'
import { Button, ButtonProps, Label } from 'semantic-ui-react'

const UploadButton = ({ button = {}, input: inputProps }) => {
	let hiddenInput = null
	return (
		<>
			<Button
				icon='upload'
				htmlFor={inputProps.id}
				label={
					<Label
						as='label'
						style={{ cursor: 'pointer' }}
						basic
						children='Select file'
					/>
				}
				onClick={() => hiddenInput.click()}
				labelPosition='right'
				{...button}
			/>
			<input
				hidden
				ref={el => {
					hiddenInput = el
				}}
				type='file'
				{...inputProps}
			/>
		</>
	)
}

export default UploadButton

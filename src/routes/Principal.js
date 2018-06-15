import React from 'react';

import { Input, Steps  } from 'antd';

const { Step } = Steps

const Principal = () => {
	return (
		<div>
			<Steps current={1}>
			    <Step title="Finished" description="This is a description." />
			    <Step title="In Progress" description="This is a description." />
			    <Step title="Waiting" description="This is a abd.__d" />
			</Steps>
		</div>
	);
}

export default Principal;
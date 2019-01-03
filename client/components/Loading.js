import React, {Fragment} from 'react';
import {Spin} from 'antd';

export default props => (
	<Fragment>
		<div className="loading">
			<Spin
				{...props}
			/>
		</div>
		<style jsx>{`
            .loading {
                display: grid;
                justify-content: center;
                align-items: center;
                justify-items: center;
                height: 100vh;
            }    
        `}
		</style>
	</Fragment>
);

import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Spin} from "antd";

import MainLayout from "./MainLayout";

const Loading = props => {
	const {mounted = false, loading = true, noWrapper = false, status = ""} = props;

	const contents = (
		<div className="loading">
			{status && status !== "" ? <p>{status}</p> : null}
			{loading ? <Spin {...props}/> : null}
			<style jsx>{`
				.loading {
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
  					justify-content: center;
					align-items: center;
					justify-items: center;
					text-align: center;
					${mounted ? null : "height: 100vh;"}
				}

				.loading > * {
					padding: 10px;
				}
			`}
			</style>
		</div>
	);

	if (noWrapper) {
		return contents;
	}

	if (mounted) {
		return (
			<MainLayout>
				{contents}
			</MainLayout>
		);
	}

	return (
		<Fragment>
			{contents}
		</Fragment>
	);
};
export default Loading;

Loading.propTypes = {
	mounted: PropTypes.bool,
	loading: PropTypes.bool,
	noWrapper: PropTypes.bool,
	status: PropTypes.string
};

Loading.defaultProps = {
	mounted: false,
	loading: true,
	noWrapper: false,
	status: ""
};

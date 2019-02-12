import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {apiUrl} = publicRuntimeConfig;

const requestUrl = path => new URL(path, apiUrl);

export const get = (path, opts = {}) => fetch(requestUrl(path), opts);
export const post = (path, opts = {}) => fetch(requestUrl(path), {
	method: "POST",
	...opts
});

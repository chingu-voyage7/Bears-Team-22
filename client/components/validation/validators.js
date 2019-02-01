import is from "is";
import isEmailLike from "is-email-like";

export const validateEmail = (_, value, callback) => {
	if (!(is.string(value) && isEmailLike(value))) {
		callback("Email isn't correctly formatted.");
	}

	callback();
};

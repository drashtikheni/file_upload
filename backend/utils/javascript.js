module.exports.env = (key) => process.env[key];

const last = (obj) => obj?.[obj?.length - 1];

module.exports.mimeType = (name = "") => last(name.split("."));

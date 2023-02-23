const env =
  process.env.NODE_ENV === "production" ? "production" : "development";
const myVariables = [
  {
    name: "backendApi",
    urls: {
      development: process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL,
      production: process.env.NEXT_PUBLIC_MYAPP_BACKEND,
    },
  },
];
myVariables
  .map((i) => ({ name: i.name, url: i.urls[env] }))
  .forEach((i) => {
    module.exports[i.name] = i.url;
  });

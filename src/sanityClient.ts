import sanityClient from "@sanity/client";

// console.log("NODE.ENV", process.env)

export default sanityClient({
    projectId: "e5l5k4i5",
    dataset: process.env.REACT_APP_SANITY_DB,
    apiVersion: "2021-03-25",
    useCdn: true,
});
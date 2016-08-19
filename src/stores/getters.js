export const getTest = ({commonStore}) => commonStore.text;

export const searchParams = ({searchStore}) => {
    if(typeof(searchStore.params) == "object") return searchStore.params
    else return JSON.parse(searchStore.params);
};

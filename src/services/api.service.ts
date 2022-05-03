import {initializeApp} from "firebase/app";
import axios from 'axios';

const catApiBaseDomain = 'https://api.thecatapi.com/v1/';

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'dfb2b8f9-fd83-417c-a948-10eaa433aa13'
}

export const getCatsFavourite = (() => {
    return axios.get(`${catApiBaseDomain}favourites?next-demo-cats`,
        {headers}
    ).then(response => response.data);
});


export const getCatsCategories = (() => {
    return axios.get(`${catApiBaseDomain}categories`)
        .then(response => response.data.map((category: { id: string, name: string }) => ({
            params: {
                id: `${category.id}`,
                name: category.name
            }
        })));
});

export const getCatsByCategoryId = ((categoryId: string) => {
    const catCategoriesUrl = `${catApiBaseDomain}images/search?limit=12&order=Desc`;
    return axios.get(`${catCategoriesUrl}&category_ids=${categoryId}`,
        {headers}
    ).then(response => response.data);
});

export const setCatAsFavourite = (catId: string) => {
    axios.post(`${catApiBaseDomain}favourites`,
        {image_id: catId, sub_id: 'next-demo-cats'},
        {headers}
    );
}

export const removeCatAsFavourite = (catId: string) => {
    return axios.delete(`${catApiBaseDomain}favourites/${catId}`,
        {headers}
    );
}




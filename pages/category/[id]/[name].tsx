import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image';
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {getCatsByCategoryId, getCatsCategories, setCatAsFavourite} from "../../../src/services/api.service";

const CategoryPage = ({cats} : {cats: any[]}) => {

    const router = useRouter();
    const {name} = router.query;

    return (
        <>
            <Head>
                <title>Next.js Demo | {name}</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <p className='main--p'>Cats with <strong>{name}</strong></p>
            {(cats||[]).map(cat => (
                <div className='main--box main--image'
                     onClick={() => setCatAsFavourite(cat.id)}
                     key={cat.id}>
                    <Image
                        alt={`cat pic id ${cat.id}`}
                        src={cat.url}
                        width={300}
                        height={300}
                        layout='responsive'
                    />
                    <button/>

                </div>
            ))}
        </>
    )
}

export async function getStaticProps({params} : {params: {id: string}}) {
    const {id} = params;
    const cats = await getCatsByCategoryId(id);
    return {
        props: {cats},
    }
}

export async function getStaticPaths() {

    const paths = await getCatsCategories();
    return {
        paths,
        fallback: true
    };
}


export default CategoryPage;

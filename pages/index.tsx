import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {useEffect, useState} from "react";
import {getCatsByCategoryId, getCatsCategories} from '../src/services/api.service';

const HomePage: NextPage = () => {

    const [categories, setCategories] = useState<Array<{ params: { name: string, id: string } }>>([]);

    useEffect(() => {
        getCatsCategories()
            .then(data => setCategories(data));
    }, []);

    return (
        <>
            <Head>
                <title>Next.js Demo</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <p className='main--p'>Show me pictures of <strong>cats</strong> with...</p>
            {categories.map(category => (
                <Link passHref={true} href={`category/${category.params.id}/${category.params.name}`} key={category.params.name}>
                    <div className='main--box main--nav'>{category.params.name}</div>
                </Link>
            ))}

        </>
    )
}

export default HomePage

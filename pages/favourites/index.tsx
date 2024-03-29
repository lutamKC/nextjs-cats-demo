import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {getCatsFavourite, removeCatAsFavourite, setCatAsFavourite} from "../../src/services/api.service";
import Image from 'next/image';

const FavouritesPage = ({favourites} : {favourites: any[]}) => {

    const [favouriteCats, setMyCats] = useState<Array<any>>(favourites);

    const removeCat = (catId: string) => {
        setMyCats(favouriteCats.filter(fv => fv.id !== catId))
        removeCatAsFavourite(catId);
    }

    return (
        <>
            <Head>
                <title>Next.js Demo | Favourites</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <p className='main--p'> {(favouriteCats||[]).length} favourite cats </p>
            {(favouriteCats||[]).map(cat => (
                <div className='main--box main--image active'
                     onClick={() => removeCat(cat.id)}
                     key={cat.id}>
                    <Image
                        alt={`cat pic id ${cat.id}`}
                        src={cat.image.url}
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


//Get the cats Server-side and render the template
export async function getServerSideProps() {

    const favourites = await getCatsFavourite()||[];

    return {
        props: {favourites},
    }
}


export default FavouritesPage;

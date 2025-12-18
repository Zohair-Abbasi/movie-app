// track the searches made by users
import { Client, Databases, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            // Filter to find document with matching query
            Query.equal('searchTerm', query)
        ]);
        console.log(result);

        // check if a recoerd of that query already exists
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            });
        } else {
            // create a new document
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
                searchTerm: query,
                count: 1,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log('Error updating search count:', error);
        throw error;
    }

    // if a document is found update its searchcount by 1
    // if no document is found create a new document with searchcount 1
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => { // Example function to get trending movies
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            // Filter to find document with matching query
            Query.limit(10),
            Query.orderDesc('count'),
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
};
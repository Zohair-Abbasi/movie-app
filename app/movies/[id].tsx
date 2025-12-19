import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps {
    label: string
    value?: string | number | null | undefined
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className='flex-col items-start justify-center mt-5'>
        <Text className='text-gray-400 font-normal text-sm'>{label}</Text>
        <Text className='text-white font-bold tex-sm mt-2'>{value ?? 'N/A'}</Text>
    </View>

)


const MovieDetails = () => {
    const { id } = useLocalSearchParams()

    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

    if (loading) {
        return (
            <View className='bg-primary flex-1 justify-center items-center'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    if (!movie) {
        return (
            <View className='bg-primary flex-1 justify-center items-center'>
                <Text className='text-white'>Movie not found</Text>
            </View>
        )
    }

    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    {movie?.poster_path && (
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={{ width: '100%', height: 550 }}
                            resizeMode='stretch'
                        />
                    )}
                </View>
                <View className='flex-col items-start justify-center px-5 mt-5'>
                    <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
                    <View className='flex-row items-center gap-x-1 mt-2'>
                        <Text className='text-gray-400 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                        <Text className='text-gray-400 text-sm'>•</Text>
                        <Text className='text-gray-400 text-sm'>{movie?.runtime} mins</Text>
                    </View>
                    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                        <Image
                            source={icons.star}
                            className='size-4'
                        />
                        <Text className='text-gray-400 font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)} / 10</Text>
                        <Text className='text-gray-400 text-sm'>({movie?.vote_count} votes)</Text>
                    </View>

                    <MovieInfo label='Overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres?.map((genre) => genre.name).join(', ')} />
                    <MovieInfo label='Production Companies' value={movie?.production_companies.map((company) => company.name).join(', ') || 'N/A'} />
                    <MovieInfo label='Budget' value={movie?.budget ? `$${movie.budget / 1000000} Million` : null} />
                    <MovieInfo label='Revenue' value={movie?.revenue ? `$${movie.revenue / 1000000} Million` : null} />
                </View>
            </ScrollView>
            <TouchableOpacity
                className='absolute bottom-10 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
                onPress={() => {
                    // Navigate back to the previous screen
                    router.back()
                }}
            >
                <Image
                    source={icons.arrow}
                    className='size-5 mr-1 mt-0.5 rotate-180'
                    tintColor='#FFFFFF' />
                <Text className='text-white font-semibold text-base'>Back</Text>

            </TouchableOpacity>
        </View>

    )
}

export default MovieDetails
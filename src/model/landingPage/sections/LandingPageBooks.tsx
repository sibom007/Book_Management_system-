"use client"
import Header from '@/components/Header';
import { useBooks } from '@/model/book/hook/useBooks';
import BookCard from '@/model/book/sections/BookCard';
import BookCardSkeleton from '@/model/book/sections/Skeleton/BookCardSkeleton';
import React from 'react';

const LandingPageBooks = () => {
    const { data, isLoading, isFetching } = useBooks()

    return (
        <div>
            <Header name='Books' />
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-10">
                {isLoading || isFetching ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <BookCardSkeleton key={index} />
                    ))
                ) : data?.books.length === 0 ? (
                    <div className="text-center text-4xl">No Books are available </div>
                ) : (
                    data?.books.map((book) => (
                        <BookCard key={book.id} book={book} className="book-card" />
                    ))
                )}
            </div>
        </div>
    );
};

export default LandingPageBooks;
import React, { useEffect, useState, useCallback } from 'react'
import { usePostStore } from '../store/usePostStore'
import { Heart } from 'lucide-react';
import { Forward } from 'lucide-react';
import { Loader } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const Posts = () => {
    const { getPosts, data, loading, hasMore } = usePostStore();
    const [like, setLike] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(1)

    const handleInfiniteScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;

        const scrollThreshold = 100;
        const hasReachedBottom =
            scrollTop + clientHeight >= scrollHeight - scrollThreshold;

        if (hasReachedBottom && !loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);

    
    const fetchPosts = () => {
            getPosts({page:1});   
    }

    useEffect(() => {
        if (page > 1) {
            getPosts({ page });
        }
    }, [page, getPosts]);


    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll);
    }, [handleInfiniteScroll]);

    const handleLike = (postId) => {
        setLike((prevLikes) => ({
            ...prevLikes,
            [postId]: !prevLikes[postId],
        }));
    };

    const handleOpenDialog = (id) => {
       setOpenDialog(true)
    }
    const handleCloseDialog = (id) => {
        setOpenDialog(false)
    }

    const navigate = useNavigate(); 

    const handleNavigate = (id)=>{
        navigate(`/posts/${id}`)
    }

    console.log("data value : ", data ? data : "aaa raa hai ");
    return (
        <div className="container mx-auto p-4">
             <motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
            <h1 className='text-white m-4 font-bold text-4xl'>ALL POSTS</h1>
            <button onClick={fetchPosts} className='  bg-white m-5 p-2 rounded-lg'>
                
                {
                    loading?(
                        <div>
                            <Loader/>
                        </div>
                    ):(
                        <div >
                        Load data
                        </div>
                    )
                }


            </button>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data && Array.isArray(data) && data.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                       
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500 cursor-pointer"
                         onClick={()=>handleNavigate(post.id)}
                        >
                            {post.title}
                        </h2>
                        <p className="text-gray-600">{post.body}</p>
                        <div className="mt-4 space-y-2">
                            <span className="flex items-center ">
                                <Heart onClick={() => handleLike(post.id)} className={`flex items-center cursor-pointer p-2 rounded ${like[post.id] ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                                    } transition-colors duration-300`} />
                                <span>{like[post.id] ? 'Liked' : 'Like'}</span>
                            </span>
                            <span className="flex items-center ">
                                <Forward onClick={() => handleOpenDialog(post.id)} className="w-5 h-5 cursor-pointer" />
                                <span className="ml-2">share</span>
                                {openDialog && (
                                    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-transparent backdrop:blur-sm ">
                                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                            <h2 className="text-xl font-semibold mb-4">This is a Dialog Box</h2>
                                            <p className="mb-4">share this post</p>
                                            
                                            <button
                                                onClick={()=>handleCloseDialog(post.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {loading && hasMore && (
                <div className="text-center py-4 text-white">Loading more posts...</div>
            )}
            {!hasMore && (
                <div className="text-center py-4 text-gray-500">
                    No more posts to load
                </div>
            )}
        </div>
    )
}



export default Posts
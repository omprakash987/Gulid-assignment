import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePostStore } from '../store/usePostStore';
import { Heart } from 'lucide-react';
import { Forward } from 'lucide-react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion'

const Post = () => {
  const [like, setLike] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const { getPost, data, loading } = usePostStore();
  console.log("id is : ", id);

  useEffect(() => {
    const fetchPost = async () => {
      await getPost(id);
    }
    fetchPost();
  }, []);

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

  return (
    <div className='h-full w-full'>
      {
        loading ? (
          <div className=' flex justify-center items-center min-h-screen w-auto'><Loader /></div>
        ) : (

          <motion.div
            className='sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data && <div
              key={data.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"

            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2"

              >
                {data.title}
              </h2>
              <p className="text-gray-600">{data.body}</p>
              <div className="mt-4 space-y-2">
                <span className="flex items-center ">
                  <Heart onClick={() => handleLike(data.id)} className={`flex items-center cursor-pointer p-2 rounded ${like[data.id] ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                    } transition-colors duration-300`} />
                  <span>{like[data.id] ? 'Liked' : 'Like'}</span>
                </span>
                <span className="flex items-center ">
                  <Forward onClick={() => handleOpenDialog(data.id)} className="w-5 h-5 cursor-pointer" />
                  <span className="ml-2">share</span>
                  {openDialog && (
                    <div
                      className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black backdrop-blur-sm"
                    >
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">This is a Dialog Box</h2>
                        <p className="mb-4">Share this post</p>

                        <button
                          onClick={() => handleCloseDialog(data.id)}
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
            }
          </motion.div>

        )
      }

    </div>
  )
}

export default Post
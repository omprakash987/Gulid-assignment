import { data } from 'react-router-dom';
import axios from '../lib/axios'
import {create} from 'zustand'; 


export const usePostStore = create((set,get)=>({
    data:[],
    loading:false,
    hasMore:true,

    getPosts:async({page})=>{
      try {
        set({loading:true})
        const res = await axios.get(`/posts?_limit=12&_page=${page}`); 
        console.log('post data : ', res.data); 
        
        if (res.data.length === 0) {
            set({ hasMore: false });
            return;
          }

          set((state) => ({
            data: page === 1 ? res.data : [...state.data, ...res.data],
            loading: false
          }));
        
      } catch (error) {
        console.log("error from get posts : ", error); 
        set({loading:false});
      }
    },
    getPost:async(id)=>{
      try {
        set({loading:true})
        const res = await axios.get(`/posts/${id}`) ; 
        console.log("single post : ", res.data); 
        set({loading:false,data:res.data})
        
      } catch (error) {
        console.log("error : ", error); 
        set({loading:false}); 
      }
    }
}))
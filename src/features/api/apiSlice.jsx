import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

 export const notesApi = createApi({
    reducerPath:"notesApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://notes-taking-application-ba.onrender.com/api/v1"}),
    // baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4000/api/v1"}),

    tagTypes: ['Notes'],
    endpoints: (builder) =>({
        getNotes: builder.query({
           query: (id)=> `/notes/${id}`,
           transformResponse: (response) => {
            if(response){
              response.Notes.reverse();
              return response;
            } else {
              console.error('API response is not an array:', response);
              return response;
            }
          },
           providesTags: ['Notes']
        }),
        addNote: builder.mutation({
            query: (note)=>({
                url:'/add',
                method:'POST',
                body: note
            }),
            invalidatesTags: ['Notes']
        }),
        deleteNote: builder.mutation({
            query: (id) =>({
                url:`/delete/${id}`,
                method:'DELETE',
                body:id,
            }),
            invalidatesTags: ['Notes']
        }),
        updateNote: builder.mutation({
            query: (note)=>({
                url:`/update/${note.id}`,
                method:"PUT",
                body: note
            }),
            invalidatesTags:["Notes"]
        }),
        updateFavorite: builder.mutation({
            query: (note)=>({
                url:`/updateFav/${note.id}`,
                method:"PUT",
                body: note
            }),
            invalidatesTags:["Notes"]
        }),
        setArcheive: builder.mutation({
            query: (note)=>({
                url:`/updateArchive/${note.id}`,
                method:"PUT",
                body: note,
               
            }),
            invalidatesTags:["Notes"],
        }),
        updateTrash: builder.mutation({
            query: (note)=>({
                url:`/updateTrash/${note.id}`,
                method:"PUT",
                body: note,
               
            }),
            invalidatesTags:["Notes"],
        }),
        login: builder.mutation({
            query:(data)=>({
                url:`/login`,
                method:"POST",
                body: data
            })
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
              url: '/forgot-password',
              method: 'POST',
              body,
            }),
          }),
          resetPassword: builder.mutation({
            query: ({ id, token, password }) => ({
              url: `/reset-password/${id}/${token}`,
              method: 'POST',
              body: { password },
            }),
          }),
        tokenVerify: builder.mutation({
            query:(token)=>({
                url: '/authentication',
                method: 'POST', // Specify the HTTP method
                headers: {
                    Authorization: `${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json', // Set the content type if needed
                },
            }),
        }),
        addUser: builder.mutation({
            query:(data)=>({
                url: '/signup',
                method: 'POST', // 
                body : data
            }),
        }),
        getUser: builder.mutation({
            query:(token)=>({
                url:'/userProfile',
                method:"GET",
                headers: {
                    Authorization: `${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json', // Set the content type if needed
                },
            })
        })
    })
})

export const {useResetPasswordMutation ,useForgotPasswordMutation,useGetNotesQuery, useAddNoteMutation ,useDeleteNoteMutation, useUpdateNoteMutation, useUpdateFavoriteMutation, useSetArcheiveMutation ,useLoginMutation, useTokenVerifyMutation, useAddUserMutation ,useGetUserMutation, useUpdateTrashMutation } = notesApi;

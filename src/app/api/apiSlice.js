import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectToken } from '../../features/users/userSlice';
// import { userId } from '../../components/Chatbar/ChatBar';
// const userId = sessionStorage.getItem('userId')
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
        prepareHeaders: (headers, { getState }) => {

            const token = selectToken(getState())// Get the token from the Redux store
            console.log(token)
            if (token) {

                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;

        }
    }),
    tagTypes: 'User',
    endpoints: (builder) => ({





        registerUser: builder.mutation({
            query: (data) => ({
                url: 'admin/register',
                method: 'POST',
                body: data
            }),

        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: 'user/login',
                method: 'POST',
                body: data
            }),

        }),



        signOutUser: builder.mutation({
            query: () => ({
                url: 'user/signOut',
                method: 'POST',
                body: ''
            }),

        }),

        getProtection: builder.mutation({
            query: () => ({
                url: 'user/protected',
                method: 'GET',
            }),

        }),

        //GET FILES


        getUsers: builder.mutation({
            query: () => ({
                url: 'admin/users',
                method: 'GET'
            })
        }),


        // activate 


        activateUsers: builder.mutation({
            query: (data) => ({
                url: 'user/activate',
                method: 'POST',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: 'user/',
                method: 'DELETE',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `user/${data.userId}`,
                method: 'PUT',
                body: data
            })
        }),
        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: `user/password`,
                method: 'PUT',
                body: data
            })
        }),
        sendVerificationEmail: builder.mutation({
            query: (data) => ({
                url: `user/password`,
                method: 'POST',
                body: data
            })
        }),


        //tender notices

        getTenderNotice: builder.mutation({
            query: () => ({
                url: 'tenderNotice/',
                method: 'GET'
            })
        }),

        
        getTenderNoticeArchive: builder.mutation({
            query: () => ({
                url: 'tenderNotice/archive',
                method: 'GET'
            })
        }),
        deleteTenderNoticeArchive: builder.mutation({
            query: (data) => ({
                url: `tenderNotice/archive/${data._id}`,
                method: 'DELETE'
            })
        }),
        getActivities: builder.mutation({
            query: () => ({
                url: 'tenderNotice/activity',
                method: 'GET'
            })
        }),

        



        addTenderNotice: builder.mutation({
            query: (data) => ({
                url: 'tenderNotice/',
                method: 'POST',
                body: data,

            })
        }),
        editTenderNotice: builder.mutation({
            query: ({ data, id }) => {


                console.log("dataaa", data, "id:", id)
                return ({
                    url: `tenderNotice/${id}`,
                    method: 'PUT',
                    body: data,

                })
            }
        }),
        deleteTenderNotice: builder.mutation({
            query: (data) => ({
                url: `tenderNotice/${data.id}`,
                method: 'DELETE',
                body:{username:data.username}

            })
        }),



        // CDC

        editCdc: builder.mutation({
            query: ({ id, data }) => {
                return ({
                    url: `cdc/${id}`,
                    method: 'PUT',
                    body: data
                })
            }
        }),

        //ADD FILE
        addCdc: builder.mutation({
            query: ({ tenderId, data,username }) => {
                console.log("tenderId,data", tenderId, data)
                const formData = new FormData();
                formData.append('file', data.file);
                formData.append('username', username);
                return {
                    url: `cdc/${tenderId}`,
                    method: 'POST',
                    body: formData,

                };
            },
        }),

        //
        deleteCdc: builder.mutation({
            query: (data) => {
                console.log(data)
                console.log("id", data.itemId)
                console.log("documentId", data.documentId)

                return ({
                    url: `cdc/${data.itemId}/${data.documentId}`,
                    method: 'DELETE',
                    body: { username: data.username }
                })
            }
        }),
        getCdcs: builder.mutation({
            query: () => ({
                url: `cdc/`,
                method: 'GET',
            })
        }),

        // GET FILE DATA
        getCdc: builder.mutation({
            query: (id) => ({
                url: `aoReponse/ao-response-data/${id}`,
                method: 'GET',
            })
        }),




        //ADD FILE
        addAoReponse: builder.mutation({
            query: ({ tenderId, data ,username}) => {
                console.log("tenderId,data", tenderId, data)
                const formData = new FormData();
                formData.append('file', data.file);
                formData.append('username', username);
                return {
                    url: `aoReponse/${tenderId}`,
                    method: 'POST',
                    body: formData,

                };
            },
        }),

        //
        deleteAoReponse: builder.mutation({
            query: (data) => {
                console.log(data)
                console.log("id", data.itemId)


                return ({
                    url: `aoReponse/${data.itemId}/${data.documentId}`,
                    method: 'DELETE',
                    body:{username:data.username}
                })
            }
        }),


        // GET FILE DATA
        getAoReponse: builder.mutation({
            query: (id) => ({
                url: `cdc/cdc-data/${id}`,
                method: 'GET',
            })
        }),


        //ADD FILE
        addPvClient: builder.mutation({
            query: ({ tenderId, data ,username}) => {
                console.log("tenderId,data", tenderId, data,username)
                const formData = new FormData();
                formData.append('file', data.file);
                formData.append('username', username);
                return {
                    url: `pvClient/${tenderId}`,
                    method: 'POST',
                    body: formData,

                };
            },
        }),

        //
        deletePvClient: builder.mutation({
            query: (data) => {
                console.log(data)
                console.log("id", data.itemId)


                return ({
                    url: `pvClient/${data.itemId}/${data.documentId}`,
                    method: 'DELETE',
                    body:{username:data.username}
                })
            }
        }),


        // GET FILE DATA
        getPvClient: builder.mutation({
            query: (id) => ({
                url: `pvClient/client-pv-data/${id}`,
                method: 'GET',
            })
        }),

        // Clients
        getClients: builder.mutation({
            query: () => ({
                url: `client/`,
                method: 'GET',
            })
        }),

        deleteClient: builder.mutation({
            query: (id) => ({
                url: `client/:id`,
                method: 'DELETE',
            })
        }),
        editeClient: builder.mutation({
            query: ({ data, id }) => {


                return ({
                    url: `client/${id}`,
                    method: 'PUT',
                    body: data,

                })
            }
        }),
        addClient: builder.mutation({
            query: (data) => ({
                url: 'client/',
                method: 'POST',
                body: data,

            })
        }),



        // fournisseur
        getFournisseurs: builder.mutation({
            query: () => ({
                url: `fournisseur/`,
                method: 'GET',
            })
        }),

        deleteFournisseur: builder.mutation({
            query: (id) => ({
                url: `fournisseur/:id`,
                method: 'DELETE',
            })
        }),

        addFournisseur: builder.mutation({
            query: (data) => ({
                url: 'fournisseur/',
                method: 'POST',
                body: data,

            })
        })











    })

})
export const { useRegisterUserMutation,
    // useUpdateUserMutation,
    useLogInUserMutation,
    useGetUsersMutation,
    useActivateUsersMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useSendVerificationEmailMutation,

    useAddTenderNoticeMutation,
    useEditTenderNoticeMutation,
    useDeleteTenderNoticeMutation,
    useGetTenderNoticeMutation, 
    useGetTenderNoticeArchiveMutation,
    useDeleteTenderNoticeArchiveMutation,
    useGetActivitiesMutation,

    useAddCdcMutation,
    useEditCdcMutation,
    useDeleteCdcMutation,
    useGetCdcMutation,
    useGetCdcsMutation,

    useAddAoReponseMutation,
    useDeleteAoReponseMutation,
    useGetAoReponseMutation,

    useAddPvClientMutation,
    useDeletePvClientMutation,
    useGetPvClientMutation,

    useAddClientMutation,
    useDeleteClientMutation,
    useEditeClientMutation,
    useGetClientsMutation,

} = apiSlice
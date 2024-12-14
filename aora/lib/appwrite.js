import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const config = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:"com.amr.aora",
    projectId:'6725ba6b0024c8e51fce',
    databaseId:"6725bf4200251b9ded7f",
    userCollectionId:"6725bf6500347cd4a44c",
    videosCollectionId:"6725bf8e00345da340b9",
    storageId:"6725c2000039744c2b9c"
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videosCollectionId,
    storageId
} = config


const client = new Client();


    client
        .setEndpoint(config.endpoint)
        .setProject(config.projectId)
        .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email,password,username)=>{
   try{
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(username)

    await signIn(email,password)

    const newUser = await database.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId:newAccount.$id,
            email,
            password,
            avatar:avatarUrl
        }
    )

    return newUser;

   }catch(error){
    console.log(error)
    throw new Error(error)
   }
}

export const signIn = async (email,password)=>  {
    try{
        const session = await account.createEmailPasswordSession(email,password)

        return session;
    }catch(error){
        throw new Error(error)
    }
}

export const getCurrentUser = async ()=>{
    try{
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0];


    }catch(error){
        console.log(error)
    }
}

export const getAllPosts = async ()=>{
    try{
        const posts = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.limit(100)]
        )

        // Transform data if necessary
        return posts.documents.map((post) => ({
            title: post.title ?? "Untitled",
            thumbnail: post.thumbnail ?? "",
            video: post.videoUrl ?? "",
            user: {
                username: post.username ?? "Unknown",
                avatar: post.avatarUrl ?? "",
            },
        }));
    }catch(error){
        new Error(error)
    } 
}

export const getLatestPosts = async ()=>{
    try{
        const posts = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        // Transform data if necessary
        return posts.documents.map((post) => ({
            title: post.title ?? "Untitled",
            thumbnail: post.thumbnail ?? "",
            video: post.videoUrl ?? "",
            user: {
                username: post.username ?? "Unknown",
                avatar: post.avatarUrl ?? "",
            },
        }));
    }catch(error){
        new Error(error)
    } 
}
// tHIS FUNCTION IS TO GET THE SEARCH POSTS
export const searchPosts = async (query)=>{
    try{
        const posts = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query]
        )

        // Transform data if necessary
        return posts.documents.map((post) => ({
            title: post.title ?? "Untitled",
            thumbnail: post.thumbnail ?? "",
            video: post.videoUrl ?? "",
            user: {
                username: post.username ?? "Unknown",
                avatar: post.avatarUrl ?? "",
            },
        }));
    }catch(error){
        new Error(error)
    } 
}

// This is for the userProfile posts
export const getUserPosts = async (userId)=>{
    try{
        const posts = await database.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.equal('creator', userId]
        )

        // Transform data if necessary
        return posts.documents.map((post) => ({
            title: post.title ?? "Untitled",
            thumbnail: post.thumbnail ?? "",
            video: post.videoUrl ?? "",
            user: {
                username: post.username ?? "Unknown",
                avatar: post.avatarUrl ?? "",
            },
        }));
    }catch(error){
        new Error(error)
    } 
}

export const signOut =  async ()=>{
    try{
      const session = await account.deleteSession('current')
      
      return session
    }catch(error){
        throw new Error(error)
    }
}
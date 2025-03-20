namespace INSTA  {
  
  type RegisterRes = {
    username: string
    email: string
    first_name: string
    last_name: string
    age: number
    phone_number: string
    bio: string
    image: File | string | null
    website: string
  }
  
  type RegisterReq = {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    age: number
    phone_number: string
    bio: string
    website: string
  }

  
  type LoginRes = {
    data: {
      user: {
        username: string
        email: string
      }
      access: string 
      refresh: string
    }
  }

  type LoginReq = {
    username: string
    password: string
  }


  type PostRes = {
    count: number
    next: string | null
    previous: string | null
    results: Array<{
      id: number
      user: {
        username: string
      }
      image?: string  
      video: File | string | null
      description: string
      hashtag?: string
      count_post_like: number
      created_at: string
      post_comment: Array<{
        user: {
          username: string
        }
        text: string
        parent: number | null
        get_count_comment_like: number
        created_at: string
      }>
    }>
  }
  
  type PostReq = void
}
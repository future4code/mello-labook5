export class Post {
  constructor(
    private id: string,
    private photoUrl: string,
    private description: string,
    private createdAt: moment.Moment,
    private type: string,
    private userId: string
  ) {}

  getId() {return this.id};
  getPhotoUrl() {return this.photoUrl}
  getDescription() {return this.description}
  getCreatedAt() {return this.createdAt}
  getType() {return this.type}
  getUserId() {return this.userId}

  static toPostModel(post: any): Post {
    return new Post (
      post.id, 
      post.photo_url, 
      post.description,
      post.created_at,
      post.type,
      post.user_id
    )
  }

}
export class Comment {
  constructor(
    public id: number,
    public name: string,
    public content: string,
    public user_id: number,
    public post_id: number,
    public approved: boolean
  ) {
  }
}

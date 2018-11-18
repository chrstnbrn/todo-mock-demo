export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public creatorId: number
  ) {}
}

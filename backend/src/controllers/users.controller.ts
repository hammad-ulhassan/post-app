

export class UserController {


    private users: any = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Alice Johnson', age: 28 }
    ];
    
    private posts: any = {
        1: [{ id: 1, content: 'Hello World' }, { id: 2, content: 'My first post' }],
        2: [{ id: 3, content: 'Welcome to my blog' }],
        3: []
    };
    
    getUsers() {
        return this.users;
    }
    
    getUserById(id: number) {
        return this.users.find((user: any) => user.id === id);
    }
    getUserPosts(userId: number) {
        return this.posts[userId] || [];
    }
    addUserPost(userId: number, post: { id: number, content: string }) {
        if (!this.posts[userId]) {
            this.posts[userId] = [];
        }
        this.posts[userId].push(post);
        return post;
    }

}
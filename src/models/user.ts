interface User {
    id: number;
    name: string;
    email: string;
}

const getUsers = () => {
    const users: User[] = [
        { id: 1, name: 'John Doe', email: 'test1@gmail.com' },
        { id: 2, name: 'Jane Smith', email: 'test2@gmail.com' },
        { id: 3, name: 'Alice Johnson', email: 'test3@gmail.com' },
        { id: 4, name: 'Bob Brown', email: 'test4@gmail.com' },
        { id: 5, name: 'Charlie Davis', email: 'test5@gmail.com' },
        { id: 6, name: 'Diana Evans', email: 'test6@gmail.com' },
        { id: 7, name: 'Ethan Foster', email: 'test7@gmail.com' },
        { id: 8, name: 'Fiona Green', email: 'test8@gmail.com' },
        { id: 9, name: 'George Harris', email: 'test9@gmail.com' },
        { id: 10, name: 'Hannah White', email: 'test10@gmail.com' }
    ]

    return users;
}

const User ={
    getUsers
}

export default User;
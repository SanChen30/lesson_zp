const users = [
    {
        id: 1,
        username: 'admin',
    },
    {
        id: 2,
        username: 'user1',
    },
    {
        id: 3,
        username: 'user2',
    },
];

console.log(
    users.find(user => user.id === 2)
);
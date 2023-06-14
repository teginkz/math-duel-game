const rooms = [];
const USER_STATE = {
    CREATED: 'created',
    READY: 'ready',
    FINISHED: 'finished'
}
function User(socket) {
    this.socket = socket;
    this.score = 0;
    this.state = USER_STATE.CREATED;
}
function joinRoom(id, socket) {
    // Find the first room with usersCount less than 2
    let room = rooms.find(room => room.users.length < 2);
    const user = new User(socket);
    if (room) {
        // If an existing room is found, add the socket to it
        room.users.push(user);
    } else {
        // If no existing room is found, create a new room with the socket
        room = {
            id,
            users: [user]
        };
        rooms.push(room);
    }
    console.log(rooms)
    return room;
}

const leaveRoom = (id) => {
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const idx = room.users.findIndex(u =>u.socket.id === id);
        if (idx > -1) {
            room.users.splice(idx, 1)
            if (!room.users.length)
                rooms.splice(i, 1)
        }
    }
}

module.exports = {
    joinRoom,
    leaveRoom,
    getRooms() {
        return rooms.map(r => ({ id: r.id, userCount: r.users.length }))
    },

}
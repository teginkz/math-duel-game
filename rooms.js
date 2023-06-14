const rooms = [];
const users = [];

const USER_STATE = {
    CREATED: 'created',
    READY: 'ready',
    FINISHED: 'finished'
}
class User {
    constructor(socket) {
        this.socket = socket;
        this.score = 0;
        this.state = USER_STATE.CREATED;
    }
}
function joinRoom(id, socket) {
    let room = rooms.find(room => room.users.length < 2);
    const user = new User(socket);
    users.push(user);
    if (room) {
        room.users.push(user);
    } else {
        room = {
            id,
            users: [user]
        };
        rooms.push(room);
    }
    console.log(rooms);
    console.log(users.map(u => u.socket.id))
    return room;
}

const leaveRoom = (id) => {
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const idx = room.users.findIndex(u => u.socket.id === id);
        if (idx > -1) {
            room.users.splice(idx, 1);
            users.splice(users.findIndex(u => u.socket.id != id), 1);
            if (!room.users.length)
                rooms.splice(i, 1);
            return;
        }
    }
}

const setReadyToPlay = (id) => {
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const idx = room.users.find(u => u.socket.id === id);
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
    setReadyToPlay,
    getRooms() {
        return rooms.map(r => ({ id: r.id, userCount: r.users.length }))
    },

}
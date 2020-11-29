const List = require('./list')
const list = new List()

list.pushBack({
    name: 'Демони',
    author: 'Один в каноє',
    song: 'Демони.mp3',
    duration: 2.20
})

list.pushFront({
    name: 'Човен',
    author: 'Один в каноє',
    song: 'Човен.mp3',
    duration: 2.44
})

list.push({
    name: 'Коала',
    author: 'Khrystyna Soloviy',
    song: 'Коала.mp3',
    duration: 3.14
}, 1)

list.print()
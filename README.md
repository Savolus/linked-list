# Linked List 📋

## Usage ⌨️

Import linked list into your code:
```js
const List = require('./list')
```

Create new linked list:
```js
const list = new List()
```

Now use it way You want 🙃

## Example 🖥

Full code at [`example.js`](https://github.com/Savolus/linked-list/blob/main/example.js):
```js
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
```

Output of following code will be:
```json
{
  "name": "Човен",
  "author": "Один в каноє",
  "song": "Човен.mp3",
  "duration": 2.44
} -> {
  "name": "Коала",
  "author": "Khrystyna Soloviy",
  "song": "Коала.mp3",
  "duration": 3.14
} -> {
  "name": "Демони",
  "author": "Один в каноє",
  "song": "Демони.mp3",
  "duration": 2.22
} -> /
```

## Bugs 🐛

If You found some kind of bugs then just tell it in the [issues](https://github.com/Savolus/data-structures/issues)

/**
 * Class to represent nodes of the linked list.
 */
class Node {
    /**
     * Constructor of node creating.
     * Pass the value to being stored in the node.
     * @param {any} value Value to being stored.
     */
    constructor(value) {
        this.value = value
        this.next = null
    }
}

/**
 * Class to represent the linked list
 */
class List {
    /**
     * Constructor of linked list creating.
     * Pass the values to being stored in the linked list.
     * @param  {...any} values Values to being stored in the linked list.
     */
    constructor(...values) {
        this.head = null
        this.length = 0

        for (const value of values)
            this.pushBack(value)
    }

    /**
     * Function to insert value to the start of the linked list.
     * @param {any} value Value to being stored in the linked list.
     */
    pushFront(value) {
        const node = new Node(value)
        node.next = this.head
        this.head = node
        this.length++
    }

    /**
     * Function to insert value to the end of the linked list.
     * @param {any} value Value to being stored in the linked list.
     */ 
    pushBack(value) {
        const node = new Node(value)

        if (this.length === 0)
            this.head = node
        else {
            let current = this.head

            while (current.next)
                current = current.next

            current.next = node
        }

        this.length++
    }

    /**
     * Function to insert value to the position in the linked list.
     * @param {any} value Value to being stored in the linked list.
     * @param {Number} position Position of value in the linked list. Position starts from 0.
     */
    push(value, position = 0) {
        if (position < 0 || position > this.length)
            throw 'PositionError: Incorrect position of value'

        if (position === 0) return this.pushFront(value)
        if (position === this.length) return this.pushBack(value)
        
        const node = new Node(value)
        let current = this.head
        let prev = null
        let index = 0

        while (index < position) {
            prev = current
            current = current.next
            index++
        }

        prev.next = node
        node.next = current
        this.length++
    }
    
    /**
     * Function to extract value from the start of the linked list.
     * @returns {any} Return value that was extracted from the start of the linked list.
     */
    popFront() {
        const current = this.head
        const next = current.next
        this.head = next
        this.length--
        return current.value
    }

    /**
     * Function to extract value from the end of the linked list.
     * @returns {any} Return value that was extracted from the end of the linked list.
     */
    popBack() {
        let current = this.head
        let prev = null

        while (current.next) {
            prev = current
            current = current.next
        }
        
        prev.next = null
        this.length--
        return current.value
    }

    /**
     * Function to extract value from the position in the linked list.
     * @param {Number} position Position of value in the linked list. Position starts from 0.
     * @returns {any} Return value that was extracted from the position in the linked list.
     */
    pop(position = 0) {
        if (position < 0 || position > this.length - 1)
            throw 'PositionError: Incorrect position of value'

        if (position === 0) return this.popFront()
        if (position === this.length - 1) return this.popBack()
        
        let current = this.head
        let prev = null
        let index = 0

        while (index < position) {
            prev = current
            current = current.next
            index++
        }

        prev.next = current.next

        this.length--
        return current.value
    }

    /**
     * Function to get value from the start of the linked list.
     * @returns {any} Return value from the start of the linked list.
     */
    get getFront() {
        return this.head.value
    }

    /**
     * Function to get value from the end of the linked list.
     * @returns {any} Return value from the end of the linked list.
     */
    get getBack() {
        let current = this.head

        while (current.next)
            current = current.next

        return current.value
    }

    /**
     * Function to get value by the position in the linked list.
     * @param {Number} position Position of value in the linked list. Position starts from 0.
     * @returns {any} Return value from the position in the linked list.
     */
    get(position = 0) {
        if (position < 0 || position > this.length - 1)
            throw 'PositionError: Incorrect position of value'

        if (position === 0) return this.getFront
        if (position === this.length - 1) return this.getBack

        let current = this.head
        let index = 0

        while (index < position) {
            current = current.next
            index++
        }

        return current.value
    }

    /**
     * Function to convert from Array or Object to the linked list.
     * @param {Array|Object} data Data to be converted into the linked list.
     */
    from(data) {
        if (data instanceof Array) {
            return new List(...data)
        } else if (data instanceof Object) {
            const list = new List()

            for (const [key, value] of Object.entries(data))
                list.pushBack({key, value})

            return list
        } else {
            throw 'ConvertationError: Cannot convert this data type to the linked list'
        }
    }

    /**
     * Function to sort the linked list.
     * Pass the comparator callback function to sort by it.
     * @param {Function} comparator Callback function to compare two values.
     */
    sort(comparator = (left, right) => left > right) {
        for (let i = 0; i < this.length; i++) {
            let temp = this.head

            for (let j = 0; j < this.length - 1; j++) {
                if (comparator(temp.value, temp.next.value)) {
                    [temp.value, temp.next.value] = [temp.next.value, temp.value]
                }

                temp = temp.next
            }
        }
    }

    /**
     * Function to shuffle the linked list.
     * Pass the number of calls to call shuffle function this many times.
     * @param {Number} deep Parameter to shuffle this many times.
     */
    shuffle(deep = 10) {
        for (let i = this.length - 1; i > -1; i--) {
            const j = ~~(Math.random() * (i + 1))
            const node = this.pop(i)
            this.push(node, j)
        }

        deep > 1 && this.shuffle(deep - 1)
    }

    /**
     * Function to iterate the linked list with callback function by calling it on every iteration.
     * @param {Function} callback Callback function that's being called on every iteration. Can take 2 arguments: value, index.
     */
    forEach(callback) {
        if (!callback)
            throw 'CallbackError: Invalid callback was passed'

        let current = this.head
        let index = 0

        while (current) {
            callback(current.value, index)
            current = current.next
            index++
        }
    }

    /**
     * Function to iterate the linked list with callback function by calling it on every iteration
     * and return new linked list of elements that passed callback function.
     * @param {Function} callback Callback function that's being called on every iteration. Can take 2 arguments: value, index.
     * @returns {List} Return new linked list of elements that passed callback function.
     */
    map(callback) {
        if (!callback)
            throw 'CallbackError: Invalid callback was passed'

        const newList = new List()
        let current = this.head
        let index = 0

        while (current) {
            newList.pushBack(callback(current.value, index))
            current = current.next
            index++
        }

        return newList
    }
    
    /**
     * Function to iterate the linked list of number type with callback function by calling it on every iteration
     * and return value that was accumulated in the first argument after all iterations by calling callback function.
     * @param {Function} callback Callback function that's being called on every iteration. Can take 2 arguments: prev, curr.
     * @returns {Number} Return number type value that was accumulated in the prev variable after all iterations.
     */
    reduce(callback) {
        if (!callback)
            throw 'CallbackError: Invalid callback was passed'

        let current = this.head
        let prev = 0

        while (current) {
            prev = callback(prev, current.value)
            current = current.next
        }

        return prev
    }

    /**
     * Function to display the linked list
     */
    print() {
        let current = this.head
        let output = ''

        while (current) {
            output += typeof current.value === 'object' ?
                `${JSON.stringify(current.value, null, 2)}` :
                `${current.value}`

            output += ' -> '

            current = current.next
        }

        output += '/'

        console.log(output)
    }
}

module.exports = List
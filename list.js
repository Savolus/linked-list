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
            throw new Error('Incorrect position of value')

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

        if (prev) prev.next = null
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
            throw new Error('Incorrect position of value')

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
            throw new Error('Incorrect position of value')

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
                list.pushBack({ key, value })

            return list
        } else {
            throw new Error('Cannot convert this data type to the linked list')
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
                if (comparator(temp.value, temp.next.value))
                    [temp.value, temp.next.value] = [temp.next.value, temp.value]

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
            throw new Error('Invalid callback was passed')

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
            throw new Error('Invalid callback was passed')

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
     * @param {any} initialValue If initialValue is specified, is used as the initial value to start the accumulation. From the start it equal to 0.
     * @returns {Number} Return number type value that was accumulated in the prev variable after all iterations.
     */
    reduce(callback, initialValue = 0) {
        if (!callback)
            throw new Error('Invalid callback was passed')

        let current = this.head
        let prev = initialValue

        while (current) {
            prev = callback(prev, current.value)
            current = current.next
        }

        return prev
    }

    /**
     * Function to iterate the linked list with test callback function by calling it on every iteration.
     * @param {Function} callback Test callback function that's being called on every iteration. Can take 2 arguments: value, index. And return true or false.
     * @returns {Node|undefined} Return found node of the linked list or undefinded if it wasn't found.
     */
    find(callback) {
        if (!callback)
            throw new Error('Invalid callback was passed')

        let current = this.head
        let index = 0

        while (current) {
            if (callback(current.value, index))
                return current

            current = current.next
            index++
        }
    }

    /**
     * Function to check if this value exist in the linked list.
     * @param {any} value Value to be checked in the linked list.
     * @returns {boolean} Return true or false if this value exist in the linked list.
     */
    includes(value) {
        if (!value)
            throw new Error('Value wasn\'t passed')

        return this.find(curr => curr === value) ? true : false
    }

    /**
     * Function to concat two linked list.
     * @param {List} list The linked list to be concated.
     * @returns Return new linked list with all values from both of the linked lists.
     */
    concat(list) {
        if (!(list instanceof List))
            throw new Error('Incorrect data type of passed argument')

        const firstList = this.map(curr => curr)
        const secondList = list

        secondList.forEach(curr => firstList.pushBack(curr))

        return firstList
    }

    /**
     * Function to filter the linked list.
     * @param {Function} callback Test callback function that's being called on every iteration. Can take 2 arguments: value, index. And return true or false.
     * @returns {List} Return new filtered linked list.
     */
    filter(callback) {
        if (!callback)
            throw new Error('Invalid callback was passed')

        const list = this.map(curr => curr)
        const filtered = new List()

        for (const node of list)
            if (callback(node))
                filtered.pushBack(node)

        return filtered
    }

    /**
     * Function to check if at least one of the nodes of the linked list passed the test callback function.
     * @param {Function} callback Test callback function to check value on every ineration of the linked list.
     * @returns {boolean} Return true if at least one of the nodes of the linked list passed test callback function.
     */
    some(callback) {
        if (!callback)
            throw new Error('Invalid callback was passed')

        const list = this.map(curr => curr)

        for (const node of list)
            if (callback(node))
                return true

        return false
    }

    /**
     * Function to check if every node of the linked list passed the test callback function.
     * @param {Function} callback Test callback function to check value on every ineration of the linked list.
     * @returns {boolean} Return true if every node of the linked list passed test callback function.
     */
    every(callback) {
        if (!callback)
            throw new Error('Invalid callback was passed')

        const list = this.map(curr => curr)
        let passed = 0

        for (const node of list)
            if (callback(node))
                passed++

        return passed === list.length
    }

    /**
     * Function to reverse the linked list.
     * @returns Return reversed linked list.
     */
    reverse() {
        const list = this.map(curr => curr)
        const reversed = new List()

        while (list.length)
            reversed.pushBack(list.popBack())

        return reversed
    }

    /**
     * Function to join the linked list into string by delim with delimiter string argument.
     * @param {String} delimiter String to delim the linked list into string with this delimiters.
     * @returns {String} Return joined string of the linked list with delimiters.
     */
    join(delimiter) {
        if (typeof delimiter !== 'string')
            throw new Error('Incorrect data type of passed argument')
        
        const list = this.map(curr => curr)
        let str = ''

        for (const node of list)
            str += `${JSON.stringify(node)}${delimiter}`

        return str.substring(0, str.length - delimiter.length)
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

    /**
     * Function-generator to make linked list itaratable with for...of
     */
    *values() {
        let current = this.head;

        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    /**
     * Creating itarator for linked lsit to make it itaratable with for...of
     */
    [Symbol.iterator]() {
        return this.values();
    }
}

module.exports = List
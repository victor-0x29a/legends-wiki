import { getDifferentKeys } from "../getDifferentKeys";

test('should not have different keys', () => {
    const obj1 = {
        foo: 'bar',
        bar: 'foo'
    }

    const obj2 = {
        foo: 'bar',
        bar: 'foo'
    }

    const result = getDifferentKeys(obj1, obj2)

    expect(result).toEqual({})
})

test('should have different keys', () => {
    const obj1 = {
        foo: 'bar',
        bar: 'foo'
    }

    const obj2 = {
        foo: 'bar',
        bar: 'foo_',
    }

    const result = getDifferentKeys(obj1, obj2)

    expect(result).toEqual({ bar: 'foo_' })
})

test('should not get the key unexists in obj1', () => {
    const obj1 = {
        foo: 'bar',
    }

    const obj2 = {
        foo: 'bar',
        bar: 'foo_',
    }

    const result = getDifferentKeys(obj1, obj2)

    expect(result).toEqual({})
})

test('should get the difference when key is an object', () => {
    const obj1 = {
        foo: {
            bar: 'foo'
        },
        bar: null
    }

    const obj2 = {
        foo: {
            bar: 'foo_',
        },
        bar: null
    }

    const result = getDifferentKeys(obj1, obj2)

    expect(result).toEqual({ foo: { bar: 'foo_' } })
})

test('shoult not get the difference when key is an object with same key and value', () => {
    const obj1 = {
        foo: {
            bar: 'foo'
        },
        bar: null
    }

    const obj2 = {
        foo: {
            bar: 'foo',
        },
        bar: null
    }

    const result = getDifferentKeys(obj1, obj2)

    expect(result).toEqual({})
})

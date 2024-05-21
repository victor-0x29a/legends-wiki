export const getDifferentKeys = (baseObject: Record<string, unknown>, compareObject: Record<string, unknown>) => {
    const newObject = {} as Record<string, unknown>

    Object.keys(baseObject).forEach((baseKey) => {
        const baseValue = baseObject[baseKey]
        const compareValue = compareObject[baseKey]

        if (baseValue !== compareValue) {
            if (typeof baseValue === 'object' && baseValue !== null && typeof compareValue === 'object' && compareValue !== null) {
                const hasDiff = Object.keys(getDifferentKeys(baseValue as Record<string, unknown>, compareValue as Record<string, unknown>)).length > 0

                if (hasDiff) {
                    newObject[baseKey] = compareValue
                }
            } else if (baseValue !== compareValue) {
                newObject[baseKey] = compareValue;
            }
        }
    })

    return newObject
}

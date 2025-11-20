const addConsole = (target, name, descriptor) => {
    const method = descriptor.value;

    descriptor.value = function (...args) {
        console.log('装饰器', this)
        return method.apply(this, args)
    };
    return descriptor;
};

const debounce = function (wait) {
    return (target, name, descriptor) => {
        const method = descriptor.value;
        let flag = true
        descriptor.value = function (...args) {
            if (flag) {
                flag = false
                setTimeout(() => {
                    flag = true
                }, wait)
                return method.apply(this, args)
            } else {
                return;
            }
        };
        return descriptor;
    };
}

export {
    addConsole,
    debounce
}
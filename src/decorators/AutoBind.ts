function AutoBind(_1: any, _2: string, description: PropertyDescriptor) {
    const originalMethod = description.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
}

export default AutoBind;
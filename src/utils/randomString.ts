const randomString = () => (Math.random().toString().slice(2, 6) + Date.now().toString().slice(-6));

export default randomString;
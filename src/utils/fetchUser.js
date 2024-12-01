export const fetchUser = () => {

    const storedUser = localStorage.getItem("user");
    const userInfo =
        storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : (localStorage.clear(), null);

    // const userInfo = localStorage.getItem('user') !== 'undefined' 
    //                 ? JSON.parse(localStorage.getItem('user'))
    //     : localStorage.clear();
    
    return userInfo;
}
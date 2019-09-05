import axios from "axios" ;

// Action creator

export const loginUser = (y,z) => {
    return (dispatch) => {
        axios.get(
            'http://localhost:15000/users',
            {
                params : {
                    // username dan password adalah element yg diambil dari object users di JSON, ejaan nya harus sama
                    username : y,
                    password : z
                }
            }
        ).then((res)=>{
            if (res.data.length === 0) {
                alert('User not found !');
            } else {
                localStorage.setItem(
                    "userData",
                    JSON.stringify({id: res.data[0].id, username: res.data[0].username})
                );
                dispatch (
                    {
                        type : 'LOGIN_SUCCESS',
                        payload : {
                            id : res.data[0].id,
                            username : res.data[0].username
                        }
                    }    
                )               
            }
        })
    }
}



export const logoutUser = () => {
    let z = JSON.parse(localStorage.getItem("userData"));
    alert(`Logout success !\n\nSee you later ${z.username}.`);
    localStorage.removeItem("userData");
    return {
        type : 'LOGOUT_SUCCESS',
    }
}


export const addToCart = (a) => {
    return {
        type : 'ATC_SUCCESS',
        payload : {
            atc:a
        }
    }
}

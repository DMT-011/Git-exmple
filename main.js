
const users = [
    {
        id: 1,
        name: 'Duong Minh Tri',
    },
    {
        id: 2,
        name: 'Pham Minh Khang',
    },
    // {
    //     id: 3,
    //     name: 'Nguyen Thanh Phuong',
    // },
];

const comments = [
    {
        id: 1,
        user_id: 1,
        content_comment: 'Tinh ngu di em oi khong ai cuu duoc em dau.'
    },
    {
        id: 2,
        user_id: 2,
        content_comment: 'Co cai con cac.'
    },
    // 
    //     id: 3,
    //     user_id: 3,
    //     content_comment: 'nin mo lai di'
    // }
];  

// API : get data call / do not accesss (block)
// BE: nhu con cac : viet API: list user, comment

const commentBlock = document.querySelector('.comment-block');
let htmls = '';


// Fake call api
function getDataComments() {
    return new Promise (function (resolve) {
        setTimeout(function() {
            resolve(comments);
        }, 1500)
    });
}

function getDataUsers() {
    return new Promise(function(resolve) {
        setTimeout(function(users) {
            resolve();
        }, 1000)
    })
}


const promise = Promise.resolve('Successfully');


// Promise.resolve
// Promise.reject
// Promise.all

Promise.all([getDataComments(), getDataUsers()])
    .then(function(data) {

        const isEmpty = data.some(item => item === undefined);

        if (isEmpty) { return Promise.reject('Data empty!!!') }

        const comments = data[0];
        const users = data[1];


        const userIds = comments.map(function(comment) {
            return comment.user_id;
        });
        
        const filterUsers = users.filter(function(user) {
            return userIds.includes(user.id);
        });

        return { filterUsers, comments };
    })
    .then(function(data) {

        // Render ui
        data.comments.forEach(function(comment) {

            const userComment = data.filterUsers.find(function(user) {
                return user.id === comment.user_id;
            });

            htmls += `<li>${userComment.name}: ${comment.content_comment}</li>`            
        })

        commentBlock.innerHTML = htmls;
    })
    .catch(function(error) {
        console.error(error);
    })
   

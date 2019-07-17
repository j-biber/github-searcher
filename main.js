const $button = $('button');
const $inputField = $('input');
const $main = $('main');

$button.on('click', getUser );
$inputField.on('keydown', function (event) {
    if (event.keyCode === 13 && $('input').val() !== '') {
        getUser();
    }
})


function User (login, avatar) {
    this.login = login;
    this.avatar = avatar;
    }
    
    function createUser (login, avatar) {
     const user = $(`<article>
            <img src="${avatar}">
            <h3>${login}</h3>
            </article>`);
            $main.append(user);
}

function getUser () {
    const searchItem = $('input').val();

    const request = $.ajax({
        url: `https://api.github.com/search/users?q=${searchItem}`,
        method: "GET"
        });
        
        request.done(function( response ) {
            $('input').val('');

            const objectArray = [];
            for (let i=0; i<6; i++) {
            objectArray.push(response.items[i])
            }
            const ourUsers = objectArray.map(item => {
                const {login, avatar_url} = item; // const login = item.login
                return new User(login, avatar_url);
            })
            //console.log(ourUsers)
            $main.empty();
            for (let i=0; i<ourUsers.length; i++) {
                createUser(ourUsers[i].login, ourUsers[i].avatar);
            }
            
        });
        
        request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
        });
}





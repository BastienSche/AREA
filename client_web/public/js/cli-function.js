async function APIRequest(url, method, token, body) {
    var response = await fetch(`http://localhost:8080/api/v1/${url}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    });
    var json = await response.json();
    console.log("API REQUEST", url, json.status, body)
    if (json.error)
        throw new Error(json.message + (json.status == 401 && json.message == 'Your token is invalide or expired.' ? ' Please refresh the page !' : ''));
    return json;
}

async function updatePersonalInformation() {
    try {
        var data = {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            email: document.querySelector('#email').value
        };
        var json = await APIRequest(`users/${id}/updatePersonalInfo`, 'PATCH', token, data);
        if (json.error) 
            throw new Error(json.message);
        toastr.success("Your password has been successfully update");
    } catch (err) {
        toastr.error(err.message);
    }
}

async function updatePassword() {
    try {
        var data = {
            passwordOld: document.querySelector('#passwordOld').value,
            passwordCf: document.querySelector('#passwordCf').value,
            password: document.querySelector('#password').value
        };
        var json = await APIRequest(`users/${id}/updatePassword`, 'PATCH', token, data);
        toastr.success("Your password has been successfully update !");
    } catch (err) {
        toastr.error(err.message);
    }
}

async function removeProvider(provider) {
    try {
        var json = await APIRequest(`users/${id}/updateProvider`, 'PATCH', token, { provider: provider });
        window.location.reload();
    } catch (err) {
        toastr.error(err.message);
        console.log('Remove Provider FAIL:', err);
    }
}

async function addArea() {
    try {
        var title = document.querySelector('#title').value;
        var action = document.querySelector('#action').value;
        var reaction = document.querySelector('#reaction').value;

        if (title == "")
            throw new Error('Please enter a valide title');
        
        if (action == "" || reaction == "")
            throw new Error('Please select action and reaction');
        
        var json = await APIRequest(`/users/${id}/area`, 'POST', token, {
            title: title,
            action: JSON.parse(action),
            reaction: JSON.parse(reaction)
        });
        if (json.error) 
            throw new Error(json.message);
        toastr.success("Your Area has been successfully added !");
    } catch (err) {
        toastr.error(err.message);
    }
}

async function startArea(areaId) {
    try { 
        var actionParam = document.getElementById("actionParam-"+areaId).value;
        var reactionParam = document.getElementById("reactionParam-"+areaId).value;

        // NO REQUIRE
        var messageContent = document.getElementById("messageContent-"+areaId).value;

        var json = await APIRequest(`/users/${id}/area/${areaId}/start`, 'PATCH', token, {
            actionParam: actionParam,
            reactionParam: {
                target: reactionParam,
                content: messageContent ? messageContent : null
            }
        });
        if (json.error) 
            throw new Error(json.message);
        await window.location.reload();
    } catch (err) {
        toastr.error(err.message);
    }
}

async function removeArea(areaId) {
    try { 
        var json = await APIRequest(`/users/${id}/area`, 'DELETE', token, {
            id: areaId
        });
        if (json.error) 
            throw new Error(json.message);
        await window.location.reload();
    } catch (err) {
        toastr.error(err.message);
    }
}
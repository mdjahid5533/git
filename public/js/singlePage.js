// Like And Dislike Script

window.onload = function () {
    const likeBtn = document.getElementById('likeBtn')
    const dislikeBtn = document.getElementById('dislikeBtn')

    likeBtn.addEventListener('click', function (e) {
        let postId = likeBtn.dataset.post
        reqLikeDislike('likes', postId)
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'Liked' : 'Like'
                likeText = likeText + `(${data.totalLikes})`
                let disLikeText = `dislike(${data.totalDislikes})`

                likeBtn.innerHTML = likeText
                disLikeText.innerHTML = disLikeText
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
    })

    dislikeBtn.addEventListener('click', function (e) {
        let postId = dislikeBtn.dataset.post
        reqLikeDislike('dislikes', postId)
            .then(res => res.json())
            .then(data => {
                let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                dislikeText = dislikeText + `(${data.totalDislikes})`
                let likeText = `like(${data.totalLikes})`

                likeBtn.innerHTML = likeText
                disLikeText.innerHTML = disLikeText
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
    })

    function reqLikeDislike(name, postId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${name}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
    }
}

// Comment Script

/*

window.onload = function () {
    const comment = document.getElementById('comment')
    const commentHolder = document.getElementById('comment-holder')

    comment.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (e.target.value) {
                let postId = comment.dataset.post
                let data = {
                    body: e.target.value
                }
                let req = generateRequest(`/api/comments/${postId}`, 'POST', data)
                fetch(req)
                    .then(res => res.json())
                    .then(data => {
                        let commentElement = creatComment(data)
                        commentHolder.insertBefore(commentElement, commentHolder.children[0])
                        e.target.value = ''
                    })
                    .catch(e => {
                        console.log(e.message);
                        alert(e.response)
                    })
            } else {
                alert('please enter a valid comment')
            }
        }
    })
}

function generateRequest(url, method, body) {
    let headers = new Headers()
    headers.append('Accept', 'Application/JSON')
    headers.append('Content-Type', 'Application/JSON')

    let req = new Request(url, {
        method,
        headers,
        body: JSON.stringify(body),
        mode: 'cors'
    })
    return req
}

function creatComment(comment) {
    let innerHTML = `
    <img 
    src=""
    class="rounded-circle mx-3 my-3" style="width: 30px;" >
    <div class="media-body my-3">
        <p>${comment.body}</p>

        <div class="my-3">
            <input class="form-control" type="text" name="reply" placeholder="press enter to reply" data-comment="${comment._id}">
        </div>
    </div>
     `
    let div = document.createElement('div')
    div.className = 'media border'
    div.innerHTML = innerHTML

    return div
}

*/
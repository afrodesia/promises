var Q = require('q')
var Promise = require('bluebird')
var GitHubApi = require('github')
var server = require('http-server')

var github = new GitHubApi({
    version: '3.0.0'
})

// URL CALL BACK WITH CALLBACK PATTERN

var getUserAvatarWithCallback = function(user, callback){
    github.search.users({ q: user}, function(err, res){
        if(err) { callback(err,null) }
        else{
            var avatarUrl = res.items[0].avatar_url
            callback(null, avatarUrl)
        }
    })
} 
getUserAvatarWithCallback('afrodesia', function(err, avatar){
    console.log('got url with callback pattern: ', avatar)
})

// URL CALL BACK WITH BLUEBIRD PROMISES

var getUserAvatarWithBluebird = function(user){
    return new Promise(function(resolve,reject){
        
        github.search.users({ q: user}, function(err,res){
            if (err){reject(err)}
            else{
                var avatarUrl = res.items[0].avatar_url
                resolve(avatarUrl)
            }
        })
    })
}
getUserAvatarWithBluebird('afrodesia')
.then(function(avatarURL){
    console.log('got url with bluebird pattern: ', avatarURL)

})

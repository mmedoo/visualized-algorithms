var gist_containers = document.querySelectorAll(".gist_cont");
var gists = document.querySelectorAll(".gist");
for (let i = 0; i < gists.length; i++) {
    gist_containers[i].append(gists[i])
}

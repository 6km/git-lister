let typingTimer;
let doneTypingInterval = 1000;

const { createApp } = Vue

const gitUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
const gitRepositoryRegex = /^[.]?[a-z\d](?:[a-z\d\.]|-(?=[a-z\d])){0,}$/i

createApp({
    data() {
        return {
            repoPath: '6km/git-lister'
        }
    },
    methods: {
        getStarURL() {
            return `https://git-lister.onrender.com/api/stars/${this.repoPath}?limit=7`
        },
        getStarMarkdown() {
            return `![Thanks to all stargazers](${this.getStarURL()})`
        },
        changeRepoPath(value) {
            this.repoPath = value
        },
        handleRepoPathChange(event) {
            clearTimeout(typingTimer);
            const newRepoPath = event.target.value?.trim()

            const username = newRepoPath.split("/")[0]
            const repository = newRepoPath.split("/")[1]

            // validate data
            const isValidUsername = gitUsernameRegex.test(username)
            const isValidRepository = typeof repository === "string" && gitRepositoryRegex.test(repository)

            console.log(isValidUsername, isValidRepository)

            if (newRepoPath && isValidUsername && isValidRepository) {
                typingTimer = setTimeout(() => this.changeRepoPath(`${username}/${repository}`), doneTypingInterval);
            }
        },
        async handleStarMarkdownCopy(event) {
            const markdown = this.getStarMarkdown()
            await navigator.clipboard.writeText(markdown)

            const button = event.target
            button.innerText = "copied"
            setTimeout(() => button.innerText = "copy", 1000)
        }
    }
}).mount('#app')
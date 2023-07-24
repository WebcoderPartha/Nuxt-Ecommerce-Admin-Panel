export const useCategory = () => {
    return useState(() => [])
}
export const usePassword = () => {
    return useState(()=> ({
        password: '$2a$10$JvVbPt6cP5R2gTOiM6cF/u6.gSa6awrHtkg555MW4XZy2i6i7xbz6'
    }))
}
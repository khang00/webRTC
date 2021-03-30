module.exports = {
    async rewrite() {
        return [
            {
                source: "/ws",
                destination: process.env.NEXT_SIGNALING_WS | "http://localhost:3000/ws"
            }
        ]
    }
}

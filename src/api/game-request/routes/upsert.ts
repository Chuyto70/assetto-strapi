export default {
    routes: [
      {
        method: 'POST',
        path: '/game-requests/upsert',
        handler: 'game-request.upsert',
      }
    ]
  }
module.exports = {
    getUsers: async function() {
        return {
            get: {
                tags: ['User'],
                summary: 'Returns the list of all the users',
                responses: {
                    200: {
                        description: 'List of all users',
                        schema: {
                            $ref: '#/definitions/Users'
                        }
                    },
                    default: {
                        description: 'Unexpected error',
                        schema: {
                            $ref: '#/definitions/Error'
                        }
                    }
                },
            }
        }
    }
}